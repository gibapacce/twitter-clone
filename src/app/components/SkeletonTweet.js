export default function SkeletonTweet() {
  return (
    <div className="box tweet-card" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)", borderRadius: 16, marginBottom: 18, padding: 20, display: 'flex', gap: 16, alignItems: 'flex-start', background: 'var(--color-bg-card)' }}>
      <div className="skeleton-avatar" style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--color-primary)', flexShrink: 0, animation: 'skeleton-pulse 1.2s infinite ease-in-out' }}></div>
      <div style={{ flex: 1 }}>
        <div style={{ width: '30%', height: 12, borderRadius: 6, background: 'var(--color-primary)', marginBottom: 10, animation: 'skeleton-pulse 1.2s infinite ease-in-out' }}></div>
        <div style={{ width: '100%', height: 16, borderRadius: 8, background: 'var(--color-primary)', marginBottom: 8, animation: 'skeleton-pulse 1.2s infinite ease-in-out' }}></div>
        <div style={{ width: '80%', height: 16, borderRadius: 8, background: 'var(--color-primary)', marginBottom: 8, animation: 'skeleton-pulse 1.2s infinite ease-in-out' }}></div>
        <div style={{ width: '60%', height: 16, borderRadius: 8, background: 'var(--color-primary)', animation: 'skeleton-pulse 1.2s infinite ease-in-out' }}></div>
      </div>
      <style jsx>{`
        @keyframes skeleton-pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
} 