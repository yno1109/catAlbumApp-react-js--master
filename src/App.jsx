import { useEffect, useState } from "react";
import { api } from "./api/api.jsx";
import BreadCrumb from "./Components/BreadCrumb.jsx";
import Nodes from "./Components/Nodes.jsx";
import ImageViewer from "./Components/ImageViewer.jsx";
import Loading from "./Components/Loading.jsx";

const App = () => {
  const [state, setState] = useState({
    path: [],
    items: [],
    isRoot: true,
    selectedImg: null,
    isLoading: false,
  });
  const [cache, setCache] = useState({});

  useEffect(() => {
    setState((prevState) => ({ ...prevState, isLoading: true }));
    const fetchData = async () => {
      try {
        const data = await api();
        if (data) {
          setState({
            ...state,
            items: data,
            path: [{ name: "root", id: 0 }],
            isRoot: true,
          });
          setCache({ 0: data });
        }
      } catch (e) {
        alert("서버 연결에 실패하였습니다.");
        throw new Error(`서버 연결에 실패하였습니다. ${e.message}`);
      } finally {
        setState((prevState) => ({ ...prevState, isLoading: false }));
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <BreadCrumb
        state={state.path}
        onPathClick={(target) => {
          const targetId = target.dataset.id;
          const curNode = state.path[state.path.length - 1];
          if (curNode.id !== targetId) {
            const targetIdx = parseInt(target.dataset.idx);
            const path = [...state.path];
            path.splice(targetIdx + 1);

            setState({
              ...state,
              items: cache[targetId],
              isRoot: path.length === 1,
              path,
            });
          }
        }}
      />
      <Nodes
        state={{ items: state.items, isRoot: state.isRoot }}
        onDirClick={(target) => {
          setState((prevState) => ({ ...prevState, isLoading: true }));
          const fetchData = async (target) => {
            const name = target.innerText;
            const id = target.dataset.id;
            let data;

            try {
              const path = [...state.path];
              path.push({ name, id });

              if (cache[id]) {
                data = cache[id];
              } else {
                data = await api(id);
                setCache({ ...cache, [id]: data });
              }

              setState({ ...state, items: data, isRoot: false, path });
            } catch (e) {
              alert("서버 연결에 실패하였습니다.");
              throw new Error(`서버 연결에 실패하였습니다. ${e.message}`);
            } finally {
              setState((prevState) => ({ ...prevState, isLoading: false }));
            }
          };

          fetchData(target);
        }}
        onFileClick={(target) => {
          setState({ ...state, selectedImg: target.dataset.src });
        }}
        onBackClick={() => {
          const path = [...state.path];
          path.pop();
          const { id } = path[path.length - 1];

          setState({
            ...state,
            items: cache[id],
            isRoot: path.length === 1,
            path,
          });
        }}
      />
      <ImageViewer
        state={state.selectedImg}
        onClose={() => {
          setState({ ...state, selectedImg: null });
        }}
      />
      <Loading state={state.isLoading} />
    </>
  );
};

export default App;
