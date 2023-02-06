import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useState } from "react";
import './App.css';

function App() {
const [items] = useState([
  { id: 0, text: "item0"}, 
  { id: 1, text: "item1"}, 
  { id: 2, text: "item2"}
]);

  // 終わった瞬間に並び順を変える処理
  const onDragEnd = (result) => {
    // console.log(result.source.index);
    // console.log(result.destination.index);
    const remove = items.splice(result.source.index, 1);
    console.log(remove);
    items.splice(result.destination.index, 0, remove[0]);
  }
  return (
    <div className="dragDropArea">
      {/* onDragEndはドラッグが終わった瞬間（離した瞬間）走る関数 */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {items.map((item, index) => (
                  <Draggable draggableId={item.text} index={index} key={item.id}>
                    {(provided) => (
                      <div 
                        className="item" 
                        ref={provided.innerRef} 
                        {...provided.draggableProps} 
                        {...provided.dragHandleProps}
                      >
                        {item.text}
                      </div>
                    )}
                  </Draggable>
                  //(Warning対策）お作法　ドラッグが終わった瞬間にDroppableの領域を広げることができる 
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
