import axios from 'axios';
import { z } from 'zod';

const api = axios.create({
  baseURL: process.env.BASE_URL ?? 'https://jsonplaceholder.typicode.com',
  timeout: 10_000,
});

const Post = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  body: z.string(),
});
type Post = z.infer<typeof Post>;

const Comment = z.object({
  postId: z.number(),
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  body: z.string(),
});
type Comment = z.infer<typeof Comment>;

describe('JSONPlaceholder sample tests', () => {
  it('GET /posts returns an array of valid posts', async () => {
    const { status, data } = await api.get<Post[]>('/posts');
    expect(status).toBe(200);
    expect(Array.isArray(data) && data.length > 0).toBe(true);
    data.slice(0, 5).forEach(item => {
      expect(Post.safeParse(item).success).toBe(true);
    });
  });

  it('GET /posts/1/comments are valid and belong to post 1', async () => {
    const { status, data } = await api.get<Comment[]>('/posts/1/comments');
    expect(status).toBe(200);
    expect(Array.isArray(data) && data.length > 0).toBe(true);
    data.forEach(c => {
      expect(Comment.safeParse(c).success).toBe(true);
      expect(c.postId).toBe(1);
    });
  });

  it('handles missing resources and odd POST payloads', async () => {
    const missing = await api.get('/posts/999999', { validateStatus: () => true });
    expect([200, 404]).toContain(missing.status);
    if (missing.status === 200) {
      expect(Object.keys(missing.data ?? {}).length).toBe(0);
    }

    const created = await api.post('/posts', { foo: 'bar', baz: 42 });
    expect(created.status).toBe(201);
    expect(created.data).toHaveProperty('id');
  });
});
