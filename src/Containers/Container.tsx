import React, { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
};

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="relative h-full w-full xl:max-w-[1600px] xl:h-[calc(100vh-38px)] xl:mx-auto xl:my-[19px] bg-whatsapp-bg xl:rounded-lg overflow-hidden shadow-2xl flex flex-col">
      {children}
    </div>
  );
};

export default Container;
