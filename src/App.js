import "./App.css";
// drag and dropを実装するにはreact-beautiful-dndをインストールするする事！
// ほぼ提携分なので、ドキュメントをみながらやるか暗記してしまった方が早い
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const items = [
  {
    id: "item-0",
    content: "item 0",
  },
  {
    id: "item-1",
    content: "item 1",
  },
  {
    id: "item-2",
    content: "item 2",
  },
  {
    id: "item-3",
    content: "item 3",
  },
  {
    id: "item-4",
    content: "item 4",
  },
];

// styling
const grid = 8;

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  width: 250,
  padding: grid,
});

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid} 0`,
  background: isDragging ? "lightgreen" : "grey", 
  ...draggableStyle, 
});

const reorder = (list, startIndex, endIndex) => {
  const removed = list.splice(startIndex, 1);
  console.log(removed);
  list.splice(endIndex, 0, removed[0]);
}

function App() {
  const onDragEnd = (result) => {
    // console.log(result);
    if(!result.destination) {
      return
    }
    reorder(items, result.source.index, result.destination.index);
  }

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}> {/* Dragし終わった後に位置を変えてほしい時に使うonDrugEnd */}
        <Droppable droppableId="droppable"> 
          {(provided, snapshot) => (  //<Droppable>の中は絶対に{(provided) => ()}関数でないといけない。
            <div            //最初の<div>の中に特殊なプロパティを設定。決まり文句。
              {...provided.droppableProps}
              ref={provided.innerRef}   //dragしている要素以外の要素(カード)の制御をしてくれている。
              style={getListStyle(snapshot.isDraggingOver)} //dragしている間、cssのstyleを変える(背景色を変えたり)
            >
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}> {/* index={index}必須mapの第二引数にindex付ける事忘れないこと。draggableID={}は数字ではなく、文字列である必要がある！注意！*/} 
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging, //dragしているのかを判断する。
                        provided.draggableProps.style //滑らかにdragする機能。
                      )}
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default App;