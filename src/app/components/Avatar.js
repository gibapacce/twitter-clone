export default function Avatar({ name, size = 40, color, image }) {
  // Gera cor baseada no nome
  function stringToColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = `hsl(${hash % 360}, 70%, 60%)`;
    return color;
  }
  const letter = name ? name[0].toUpperCase() : "?";
  if (image) {
    return (
      <img
        src={image}
        alt={name}
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          objectFit: "cover",
          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
        }}
      />
    );
  }
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: color || stringToColor(name || "?"),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--color-text-inverse, #fff)",
        fontWeight: "bold",
        fontSize: size * 0.5,
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
      }}
      title={name}
    >
      {letter}
    </div>
  );
} 