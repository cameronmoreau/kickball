import React from "react";

interface AppContainerProps {
  children?: React.ReactElement;
  Header?: React.ReactElement;
  Footer?: React.ReactElement;
}

const AppContainer: React.FC<AppContainerProps> = ({
  Header,
  Footer,
  children,
}) => {
  return (
    <div className="flex flex-col h-screen justify-between">
      {Header}
      <main className="mb-auto overflow-scroll	">{children}</main>
      {Footer}
    </div>
  );
};

export default AppContainer;
