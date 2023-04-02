import React from "react";

interface AvatarProps {
  src?: string;
  name?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, name }) => {
  if (src) {
    return <img className="h-10 w-10 rounded-full" src={src} />;
  }

  let fallback = "";
  if (!!name) {
    fallback = name
      .split(" ")
      .map((c) => c[0])
      .join("");
  }

  return (
    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-500">
      <span className="font-medium leading-none text-white">{fallback}</span>
    </span>
  );
};

export default Avatar;
