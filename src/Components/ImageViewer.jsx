const START_URL = `https://fe-dev-matching-2021-03-serverlessdeploymentbuck-1ooef0cg8h3vq.s3.ap-northeast-2.amazonaws.com/public`;

const ImageViewer = ({ state, onClose }) => {
  const onClick = (e) => {
    if (e.target.className === "Modal ImageViewer") {
      e.target.style.visibility = "hidden";
      onClose();
    }
  };

  document.body.addEventListener("keyup", (e) => {
    if (state && e.key === "Escape") {
      onClose();
    }
  });

  if (state) {
    const $imageViewer = document.querySelector(".ImageViewer");
    if ($imageViewer) {
      $imageViewer.style.visibility = "visible";
    }
    return (
      <div className="Modal ImageViewer" onClick={onClick}>
        <div className="content">
          <img src={`${START_URL}${state}`} alt="img" />
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default ImageViewer;
