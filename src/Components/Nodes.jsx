const Nodes = ({ state, onDirClick, onFileClick, onBackClick }) => {
  const onClick = (e) => {
    const target = e.target.closest(".Node");
    const nodeType = target?.firstElementChild.src.slice(29, -4);

    switch (nodeType) {
      case "prev":
        onBackClick();
        break;

      case "directory":
        onDirClick(target);
        break;

      case "file":
        onFileClick(target);
        break;

      default:
        break;
    }
  };

  return (
    <div className="Nodes" onClick={onClick}>
      {state.isRoot ? null : (
        <div className="Node">
          <img src="./assets/prev.png" alt="prev" />
        </div>
      )}
      {state.items.map((node) => {
        if (node.type === "DIRECTORY") {
          return (
            <div className="Node" data-id={node.id} key={node.id}>
              <img src={`./assets/${node.type.toLowerCase()}.png`} alt="사진" />
              <div>{node.name}</div>
            </div>
          );
        } else {
          return (
            <div
              className="Node"
              data-id={node.id}
              data-src={node.filePath}
              key={node.id}
            >
              <img src={`./assets/${node.type.toLowerCase()}.png`} alt="사진" />
              <div>{node.name}</div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Nodes;
