const BreadCrumb = ({ state, onPathClick }) => {
  const onClick = (e) => {
    if (e.target.dataset.id) {
      onPathClick(e.target);
    }
  };

  return (
    <nav className="Breadcrumb" onClick={onClick}>
      {state.map(({ name, id }, idx) => (
        <div data-id={id} data-idx={idx} key={id}>
          {name}
        </div>
      ))}
    </nav>
  );
};

export default BreadCrumb;
