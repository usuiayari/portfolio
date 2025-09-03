"use client"; // データ取得などのためにクライアントコンポーネントとしてマークします

import React, { useState, useEffect } from 'react';

// --- 型定義 ---
type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
};

// Lanyard APIから返されるデータの型定義
type LanyardData = {
  discord_user: {
    id: string;
    username: string;
    avatar: string;
    discriminator: string;
  };
  discord_status: 'online' | 'idle' | 'dnd' | 'offline';
  activities: {
    name: string;
    details?: string;
    state?: string;
    assets?: {
      large_image?: string;
      large_text?: string;
    };
    type: number;
  }[];
  listening_to_spotify: boolean;
  spotify: {
    track_id: string;
    song: string;
    artist: string;
    album_art_url: string;
  } | null;
};


// --- ヘルパー関数 ---
const getLanguageColor = (language: string | null): string => {
  if (!language) return '#6e7681';
  const colors: { [key: string]: string } = {
    'JavaScript': '#f1e05a', 'TypeScript': '#3178c6', 'HTML': '#e34c26',
    'CSS': '#563d7c', 'Python': '#3572A5', 'Java': '#b07219',
    'Go': '#00ADD8', 'Ruby': '#701516', 'PHP': '#4F5D95',
    'C++': '#f34b7d', 'C#': '#178600', 'Swift': '#ffac45',
    'Rust': '#dea584', 'Kotlin': '#F18E33', 'Dart': '#00B4AB',
  };
  return colors[language] || '#6e7681';
};


// --- コンポーネント定義 ---

// 1. プロフィールヘッダーコンポーネント
const ProfileHeader = ({ presence }: { presence: LanyardData | null }) => {
  // ▼▼▼ プロフィール情報を編集 ▼▼▼
  const profile = {
    name: "Ayari",
    title: "Web Developer / Software Engineer",
    bio: "適当に勉強しながら開発をしています。",
    avatarUrl: "/avatar_placeholder.png", // publicフォルダに画像を配置した場合
    githubUrl: "https://github.com/usuiayari",
    twitterUrl: "https://twitter.com/nno_yate",
    youtubeUrl: "https://youtube.com/channel/Ayakaq",
  };
  // ▲▲▲ プロフィール情報を編集 ▲▲▲

  return (
    <header className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-10">
      <div className="animate-on-scroll" style={{ transitionDelay: '100ms' }}>
        <img
          src="https://placehold.co/128x128/1F2937/FFFFFF?text=Avatar"
          alt="プロフィール画像"
          width={128}
          height={128}
          className="rounded-full ring-4 ring-gray-700"
        />
      </div>
      <div className="text-center md:text-left">
        <h1 className="text-4xl font-bold text-cyan-400 animate-on-scroll" style={{ transitionDelay: '200ms' }}>{profile.name}</h1>
        <p className="mt-2 text-xl text-gray-300 animate-on-scroll" style={{ transitionDelay: '300ms' }}>{profile.title}</p>
        <p className="mt-4 text-gray-400 max-w-md animate-on-scroll" style={{ transitionDelay: '400ms' }}>{profile.bio}</p>
        
        {/* Discordステータス表示コンポーネントをここに追加 */}
        <DiscordPresence presence={presence} />

        <div className="mt-6 flex justify-center md:justify-start space-x-5 animate-on-scroll" style={{ transitionDelay: '600ms' }}>
          <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.492.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd"></path></svg>
          </a>
          <a href={profile.twitterUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
             <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
          </a>
          <a href={profile.youtubeUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.254,4,12,4,12,4S5.746,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.746,20,12,20,12,20s6.254,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z"></path></svg>
          </a>
        </div>
      </div>
    </header>
  );
};


// 2. Discordステータス表示コンポーネント (表示に特化)
const DiscordPresence = ({ presence }: { presence: LanyardData | null }) => {
    if (!presence) {
        return (
            <div className="mt-4 p-3 bg-gray-800 border border-gray-700 rounded-lg max-w-md mx-auto md:mx-0 animate-on-scroll" style={{ transitionDelay: '500ms' }}>
                <p className="text-sm text-gray-400">Discordステータスを読み込み中...</p>
            </div>
        );
    }

    const { discord_user, discord_status, activities, spotify } = presence;
    const avatarUrl = `https://cdn.discordapp.com/avatars/${discord_user.id}/${discord_user.avatar}.png`;
    const statusText = { online: 'オンライン', idle: '離席中', dnd: '取り込み中', offline: 'オフライン' };
    const activity = activities.find(act => act.type === 0);

    return (
        <a 
            href={`https://discord.com/users/${discord_user.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 p-3 bg-gray-800 border border-gray-700 rounded-lg max-w-md mx-auto md:mx-0 animate-on-scroll block hover:bg-gray-700 transition-colors duration-300" 
            style={{ transitionDelay: '500ms' }}
        >
            <div className="flex items-center">
                <div className="relative">
                    <img src={avatarUrl} alt={discord_user.username} className="w-12 h-12 rounded-full" />
                    <span className={`status-dot status-${discord_status}`}></span>
                </div>
                <div className="ml-4 text-left">
                    <p className="font-semibold text-white">{discord_user.username}</p>
                    <p className="text-xs text-gray-400">
                        {spotify ? `Listening to ${spotify.song}` : (activity ? activity.name : statusText[discord_status])}
                    </p>
                </div>
            </div>
        </a>
    );
};

// 3. 個別のプロジェクトカードコンポーネント
const ProjectCard = ({ repo, index }: { repo: Repo, index: number }) => {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="card-hover-effect bg-gray-800 rounded-lg p-6 flex flex-col justify-between border border-gray-700 hover:border-cyan-500 transition-colors duration-300 animate-on-scroll"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div>
        <div className="flex items-center space-x-3 mb-3">
          <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12,2A10,10,0,0,0,2,12C2,15.54,3.95,18.57,6.75,20.21L5.9,21.5L8.5,21L7.54,18.9C8.9,19.65,10.41,20.08,12,20.08C17.5,20.08,22,15.6,22,10.08C22,4.55,17.5,0,12,0Z"></path></svg>
          <h3 className="font-bold text-lg text-gray-100">{repo.name}</h3>
        </div>
        <p className="text-sm text-gray-400 mb-4 min-h-[40px]">
          {repo.description || '概要がありません'}
        </p>
      </div>
      <div className="flex items-center text-xs text-gray-500 space-x-4">
        {repo.language && (
          <span className="flex items-center space-x-1">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: getLanguageColor(repo.language) }}></span>
            <span>{repo.language}</span>
          </span>
        )}
        <span className="flex items-center space-x-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" /></svg>
          <span>{repo.stargazers_count}</span>
        </span>
        <span className="flex items-center space-x-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M10,4H8C5.79,4 4,5.79 4,8V10H6V8C6,6.9 6.9,6 8,6H10V4M14,20H16C18.21,20 20,18.21 20,16V14H18V16C18,17.1 17.1,18 16,18H14V20M15,9H9V15H15V9Z" /></svg>
          <span>{repo.forks_count}</span>
        </span>
      </div>
    </a>
  );
};

// 4. GitHubプロジェクトセクションコンポーネント (データ表示に特化)
const GitHubProjects = ({ repos, loading, error }: { repos: Repo[], loading: boolean, error: string | null }) => {
    return (
      <section className="mt-16 md:mt-24">
        <h2 className="text-3xl font-bold text-center md:text-left text-cyan-400 animate-on-scroll" style={{ transitionDelay: '0ms' }}>GitHub Projects</h2>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading && <p className="md:col-span-2 lg:col-span-3 text-center text-gray-400">プロジェクトを読み込んでいます...</p>}
          {error && <p className="md:col-span-2 lg:col-span-3 text-center text-red-400">プロジェクトの読み込みに失敗しました: {error}</p>}
          {!loading && !error && repos.length === 0 && (
            <p className="md:col-span-2 lg:col-span-3 text-center text-gray-400">公開されているプロジェクトが見つかりませんでした。</p>
          )}
          {!loading && !error && repos.map((repo, index) => (
            <ProjectCard key={repo.id} repo={repo} index={index} />
          ))}
        </div>
      </section>
    );
};

// 5. スキルセクションコンポーネント
const Skills = () => {
  // ▼▼▼ アイコンのURLやスキル名を自由に編集してください ▼▼▼
  // アイコンは https://simpleicons.org/ などで探せます。
  const minecraftSkills = [
    { name: 'Minecraftサーバー運営', iconUrl: 'https://img.icons8.com/fluency/96/server.png' },
    { name: 'Minecraftプラグイン開発', iconUrl: 'https://img.icons8.com/fluency/96/puzzle.png' },
  ];
  const otherSkills = [
    { name: 'TypeScript', iconUrl: 'https://cdn.simpleicons.org/typescript/3178C6' },
    { name: 'React', iconUrl: 'https://cdn.simpleicons.org/react/61DAFB' },
    { name: 'Next.js', iconUrl: 'https://cdn.simpleicons.org/nextdotjs/white' },
    { name: 'discord.py/js', iconUrl: 'https://cdn.simpleicons.org/discord/5865F2' },
    { name: 'Tailwind CSS', iconUrl: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
    { name: 'HTML5', iconUrl: 'https://cdn.simpleicons.org/html5/E34C26' },
  ];

  return (
    <section className="mt-16 md:mt-24">
      <h2 className="text-3xl font-bold text-center md:text-left text-cyan-400 animate-on-scroll" style={{ transitionDelay: '0ms' }}>
        My Skills
      </h2>
      <div className="mt-8 grid grid-cols-2 md:grid-cols-6 gap-6">
        {minecraftSkills.map((skill, index) => (
          <div
            key={skill.name}
            className="col-span-2 md:col-span-3 flex flex-col items-center justify-center p-4 bg-gray-800 rounded-lg border border-gray-700 animate-on-scroll card-hover-effect"
            style={{ transitionDelay: `${100 + index * 50}ms` }}
          >
            <img src={skill.iconUrl} alt={`${skill.name} icon`} className="w-10 h-10" />
            <p className="mt-3 text-sm font-medium text-gray-300">{skill.name}</p>
          </div>
        ))}
        {otherSkills.map((skill, index) => (
          <div
            key={skill.name}
            className="flex flex-col items-center justify-center p-4 bg-gray-800 rounded-lg border border-gray-700 animate-on-scroll card-hover-effect"
            style={{ transitionDelay: `${200 + index * 50}ms` }}
          >
            <img src={skill.iconUrl} alt={`${skill.name} icon`} className="w-10 h-10" />
            <p className="mt-3 text-sm font-medium text-gray-300">{skill.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};


// 6. フッターコンポーネント
const Footer = () => {
    return (
        <footer className="text-center py-8">
            <p className="text-gray-500">&copy; {new Date().getFullYear()} ©2025 Ayari Usui. All Rights Reserved.</p>
        </footer>
    );
}


// --- メインページ ---
export default function PortfolioPage() {
    // ▼▼▼ あなたのGitHubユーザー名に書き換えてください ▼▼▼
    const GITHUB_USERNAME = 'usuiayari'; // 例: 'google', 'facebook' など
    
    // ▼▼▼ あなたのDiscordユーザーIDに書き換えてください ▼▼▼
    const DISCORD_USER_ID = '1168902836478804030';

    const [repos, setRepos] = useState<Repo[]>([]);
    const [githubLoading, setGithubLoading] = useState(true);
    const [githubError, setGithubError] = useState<string | null>(null);
    const [presence, setPresence] = useState<LanyardData | null>(null);

    // GitHubデータ取得のロジック
    useEffect(() => {
      const fetchGitHubProjects = async () => {
        try {
          const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6&direction=desc`);
          if (!response.ok) {
            throw new Error(`GitHub APIからの応答エラー: ${response.status}`);
          }
          const data: Repo[] = await response.json();
          setRepos(data);
        } catch (err: any) {
          setGithubError(err.message);
        } finally {
          setGithubLoading(false);
        }
      };
      if (GITHUB_USERNAME && GITHUB_USERNAME !== 'octocat') {
        fetchGitHubProjects();
      } else {
        setGithubLoading(false); // ユーザー名が設定されていない場合はローディングを終了
      }
    }, [GITHUB_USERNAME]);

    // Discordデータ取得のロジック
    useEffect(() => {
        if (!DISCORD_USER_ID || DISCORD_USER_ID === 'あなたのDiscordユーザーID') return;

        const socket = new WebSocket('wss://api.lanyard.rest/socket');

        socket.onopen = () => {
            socket.send(JSON.stringify({ op: 2, d: { subscribe_to_id: DISCORD_USER_ID } }));
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.t === 'INIT_STATE' || data.t === 'PRESENCE_UPDATE') {
                setPresence(data.d);
            }
        };
        
        return () => {
            socket.close();
        };
    }, [DISCORD_USER_ID]);

    // アニメーション設定のロジック
    useEffect(() => {
      if (githubLoading) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach((el) => observer.observe(el));

      return () => observer.disconnect();
    }, [githubLoading, repos, presence]); 

    return (
    <div className="bg-gray-900 text-white min-h-screen">
       <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Noto+Sans+JP:wght@400;500;700&display=swap');
        
        body {
            font-family: 'Inter', 'Noto Sans JP', sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            overflow-x: hidden;
        }
        
        .animate-on-scroll {
          opacity: 0;
          transform: translateX(50px);
          filter: brightness(5);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out, filter 0.8s ease-out;
        }

        .animate-on-scroll.is-visible {
          opacity: 1;
          transform: translateX(0);
          filter: brightness(1);
        }

        .card-hover-effect {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card-hover-effect:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
        }

        .status-dot {
            position: absolute;
            bottom: 0;
            right: 0;
            width: 14px;
            height: 14px;
            border-radius: 50%;
            border: 3px solid #1f2937; /* bg-gray-800の色 */
        }
        .status-online { background-color: #3ba55d; }
        .status-idle { background-color: #faa61a; }
        .status-dnd { background-color: #ed4245; }
        .status-offline { background-color: #747f8d; }
      `}</style>

      <div className="container mx-auto max-w-4xl px-4 py-12 md:py-20">
        <ProfileHeader presence={presence} />
        <Skills />
        <GitHubProjects repos={repos} loading={githubLoading} error={githubError} />
      </div>
      <Footer />
    </div>
  );
}

