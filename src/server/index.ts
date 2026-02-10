import express from 'express';
import { InitResponse } from '../shared/types/api';
import { getDailySyllable } from "../shared/syllableHelper";
import { reddit, createServer, context, getServerPort } from '@devvit/web/server';
import { createPost } from './core/post';

const app = express();

// Middleware for JSON body parsing
app.use(express.json());
// Middleware for URL-encoded body parsing
app.use(express.urlencoded({ extended: true }));
// Middleware for plain text body parsing
app.use(express.text());

const router = express.Router();

// <-------- API -------->

// Init post
router.get<{ postId: string }, InitResponse | { status: string; message: string }>(
  '/api/init',
  async (_req, res): Promise<void> => {
    console.log("<--------------------->")
    console.log("🟩 Initializing game...")
    
    const { postId } = context;
    
    if (!postId) {
      console.error('API Init Error: postId not found in devvit context');
      res.status(400).json({
        status: 'error',
        message: 'postId is required but missing from context',
      });
      return;
    }
    
    if (!context.postData) {
      console.error('API Init Error: postData not found in devvit context');
      res.status(400).json({
        status: 'error',
        message: 'postData is required but missing from context',
      });
      return;
    }
    
    try {
      // Fetch syllable and username
      const [syllable, username] = await Promise.all([
        context.postData.syllable?.toString(),
        reddit.getCurrentUsername(),
      ]);

      console.log(`🔠 The syllable for this game post is '${syllable}'`)
      
      // Fail if syllable is missing
      if (!syllable) {
        console.error('API Init Error: syllable not found in redis');
        res.status(400).json({
          status: 'error',
          message: `syllable is required but missing from redis`
        });
        return;
      }
      
      // Otherwise, return data back to post!
      res.json({
        type: 'init',
        postId: postId,
        syllable: syllable,
        username: username ?? 'anonymous',
      });
      
      console.log("<--------------------->")

    } catch (error) {
      console.error(`API Init Error for post ${postId}:`, error);
      let errorMessage = 'Unknown error during initialization';
      if (error instanceof Error) {
        errorMessage = `Initialization failed: ${error.message}`;
      }
      res.status(400).json({ status: 'error', message: errorMessage });
    }
  }
);

// Post comment
router.post<{},{ status: string }, { text: string }>(
  '/api/share',
  async (req, res): Promise<void> => {
    try {
      const { postId } = context;

      if (!postId) {
        res.status(400).json({ status: 'error' });
        return;
      }

      const username = await reddit.getCurrentUsername();
      
      await reddit.submitComment({
        id: postId,
        text: req.body.text,
        runAs: 'USER'
      });
      
      console.log(`🗨️ Comment posted by ${username}`);
      console.log(`postId: ${postId}, text:${req.body.text}`)

      res.json({ status: 'ok' });
    } catch (error) {
      console.error('Share error:', error);
      res.status(500).json({ status: 'error' });
    }
  }
);


// <-------- INTERNAL -------->
router.post('/internal/on-app-install', async (_req, res): Promise<void> => {
  try {
    const post = await createPost();

    res.json({
      status: 'success',
      message: `Post created in subreddit ${context.subredditName} with id ${post.id}`,
    });
  } catch (error) {
    console.error(`Error creating post: ${error}`);
    res.status(400).json({
      status: 'error',
      message: 'Failed to create post',
    });
  }
});

router.post('/internal/menu/post-create', async (_req, res): Promise<void> => {
  try {
    const post = await createPost();

    res.json({
      navigateTo: `https://reddit.com/r/${context.subredditName}/comments/${post.id}`,
    });
  } catch (error) {
    console.error(`Error creating post: ${error}`);
    res.status(400).json({
      status: 'error',
      message: 'Failed to create post',
    });
  }
});

router.post('/internal/scheduler/create-game-post', async (_req, res): Promise<void> => {
  try {
    console.log("<--------------------->")
    console.log("🛠️ Creating new scheduled game post...")

    const { subredditName } = context;
    if (!subredditName) {
      throw new Error('subredditName is required');
    }

    const syllable = getDailySyllable();
    await reddit.submitCustomPost({
      subredditName: subredditName,
      title: `Guess the syllable for ${new Date().toLocaleDateString()}!`,
      postData: {
        syllable: syllable
      }
    });
    
    console.log(`🔠 Syllable of the day is: '${syllable}'`);
    console.log("<--------------------->")

  } catch (error) {
    console.error(`Error in scheduled action: ${error}`);
    res.status(400).json({
      status: 'error',
      message: 'Scheduled action failed',
    });
  }
});

// Use router middleware
app.use(router);

// Get port from environment variable with fallback
const port = getServerPort();

const server = createServer(app);
server.on('error', (err) => console.error(`server error; ${err.stack}`));
server.listen(port);
