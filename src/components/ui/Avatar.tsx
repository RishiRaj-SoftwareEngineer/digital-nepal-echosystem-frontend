type AvatarProps = {
  name: string;
  image?: string;
  size?: "sm" | "md" | "lg";
};

export function Avatar({ name, image }: AvatarProps) {
  const initials = name.slice(0, 2);

  if (image) {
    return <img src={image} alt={name} />;
  }

  return <div>{initials}</div>;
}
