import React from "react";

interface AppContainerProps {
  children?: React.ReactNode;
  Header?: React.ReactNode;
  Footer?: React.ReactNode;
}

const AppContainer: React.FC<AppContainerProps> = ({
  Header,
  Footer,
  children,
}) => {
  return (
    <div>
      {Header && <div className="sticky top-0 z-50">{Header}</div>}
      <main>{children}</main>
      {Footer && <div className="sticky bottom-0 z-50">{Footer}</div>}
    </div>
  );
};

export default AppContainer;
