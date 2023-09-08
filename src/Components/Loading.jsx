const Loading = ({ state }) => {
  return state ? (
    <div className="Modal Loading">
      <div className="content">
        <img src="./assets/nyan-cat.gif" alt="loading" />
      </div>
    </div>
  ) : null;
};

export default Loading;
