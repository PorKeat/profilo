import { Block } from '@/types/blocks';

export interface WorkflowFile {
  filename: string;
  content: string;
}

export function generateWorkflows(blocks: Block[]): WorkflowFile[] {
  const workflows: WorkflowFile[] = [];

  // Check for blog posts
  const blogBlock = blocks.find(b => b.type === 'blog-posts');
  if (blogBlock && blogBlock.type === 'blog-posts') {
    const { platform, username } = blogBlock.data;
    let feedList = '';
    
    if (platform === 'dev.to') {
      feedList = `https://dev.to/feed/${username}`;
    } else if (platform === 'medium') {
      feedList = `https://medium.com/feed/@${username}`;
    } else if (platform === 'hashnode') {
      feedList = `https://${username}.hashnode.dev/rss.xml`;
    }

    workflows.push({
      filename: 'blog-post-workflow.yml',
      content: `name: Latest blog post workflow
on:
  schedule:
    - cron: '0 * * * *'
  workflow_dispatch:

permissions:
  contents: write

jobs:
  update-readme-with-blog:
    name: Update this repo's README with latest blog posts
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Pull in posts
        uses: gautamkrishnar/blog-post-workflow@v1
        with:
          feed_list: "${feedList}"
`
    });
  }

  // Check for snake animation
  const hasSnake = blocks.some(b => 
    (b.type === 'snake') || 
    (b.type === 'github-stats' && b.data.showSnake)
  );

  if (hasSnake) {
    // Find the username from either snake block or github-stats block
    let username = 'yourusername';
    const snakeBlock = blocks.find(b => b.type === 'snake');
    if (snakeBlock && snakeBlock.type === 'snake' && snakeBlock.data.username) {
      username = snakeBlock.data.username;
    } else {
      const statsBlock = blocks.find(b => b.type === 'github-stats');
      if (statsBlock && statsBlock.type === 'github-stats' && statsBlock.data.username) {
        username = statsBlock.data.username;
      }
    }

    workflows.push({
      filename: 'generate-snake.yml',
      content: `name: Generate Snake Animation

on:
  schedule:
    - cron: "0 0 * * *"
  workflow_dispatch:

jobs:
  generate:
    permissions: 
      contents: write
    runs-on: ubuntu-latest
    timeout-minutes: 5

    steps:
      - name: generate github-contribution-grid-snake.svg
        uses: Platane/snk/svg-only@v3
        with:
          github_user_name: ${username}
          outputs: |
            dist/github-contribution-grid-snake.svg
            dist/github-contribution-grid-snake-dark.svg?palette=github-dark

      - name: push github-contribution-grid-snake.svg to the output branch
        uses: crazy-max/ghaction-github-pages@v3.1.0
        with:
          target_branch: output
          build_dir: dist
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
`
    });
  }

  // Check for pacman animation
  const hasPacman = blocks.some(b => 
    (b.type === 'pacman') || 
    (b.type === 'github-stats' && b.data.showPacman)
  );

  if (hasPacman) {
    let username = 'yourusername';
    const pacmanBlock = blocks.find(b => b.type === 'pacman');
    if (pacmanBlock && pacmanBlock.type === 'pacman' && pacmanBlock.data.username) {
      username = pacmanBlock.data.username;
    } else {
      const statsBlock = blocks.find(b => b.type === 'github-stats');
      if (statsBlock && statsBlock.type === 'github-stats' && statsBlock.data.username) {
        username = statsBlock.data.username;
      }
    }

    workflows.push({
      filename: 'generate-pacman.yml',
      content: `name: Generate Pacman Animation

on:
  schedule:
    - cron: "0 0 * * *"
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    name: generate-github-profile-pacman
    permissions:
      contents: write
    steps:
      - uses: actions/checkout@v3
      - uses: abozanona/pacman-contribution-graph@v1
        with:
          github_user_name: ${username}
          github_token: \${{ secrets.GITHUB_TOKEN }}
`
    });
  }

  // Check for 3D contrib
  const has3dContrib = blocks.some(b => 
    b.type === 'github-stats' && b.data.show3dContrib
  );

  if (has3dContrib) {
    let username = 'yourusername';
    const statsBlock = blocks.find(b => b.type === 'github-stats');
    if (statsBlock && statsBlock.type === 'github-stats' && statsBlock.data.username) {
      username = statsBlock.data.username;
    }

    workflows.push({
      filename: 'generate-3d-contrib.yml',
      content: `name: GitHub-Profile-3D-Contrib

on:
  schedule:
    - cron: "0 18 * * *"
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    name: generate-github-profile-3d-contrib
    permissions:
      contents: write
    steps:
      - uses: actions/checkout@v3
      - uses: yoshi389111/github-profile-3d-contrib@0.7.1
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
          USERNAME: ${username}
      - name: Commit & Push
        run: |
          git config user.name github-actions
          git config user.email github-actions@github.com
          git add -A .
          git commit -m "generated"
          git push
`
    });
  }

  return workflows;
}
