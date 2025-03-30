import {
  Streamlit,
  withStreamlitConnection,
  ComponentProps,
} from "streamlit-component-lib"
import React, { useCallback, useEffect, useMemo } from "react"
import "./StreamlitGrid.css"

type GridItem = {
  label: string;
  background_color?: string;
  text_color?: string;
  row_span?: number;
  col_span?: number;
};

interface Props extends ComponentProps {
  args: { 
    grid_layout: GridItem[][];
    columns?: number;
    gap?: number;
    width?: number;
    cell_height?: number;
    background_color?: string;
    use_container_width?: boolean;
  };
}

const StreamlitGrid = ({ args, theme }: Props) => {
  const { grid_layout, columns, gap, width, background_color, cell_height, use_container_width } = args

  const containerStyle: React.CSSProperties = useMemo(() => ({
      display: "grid", 
      padding: "3px",
      borderRadius: "7px",
      gap: `${gap || 10}px`, 
      width: use_container_width ? "100%" : `${width || 500}px`,
      gridTemplateColumns: `repeat(${columns || 4}, 1fr)`,
      backgroundColor: background_color || theme?.backgroundColor,
    })
  , [background_color, columns, gap, theme, use_container_width, width])


  const handleClick = useCallback((label: string) => {
    Streamlit.setComponentValue(label); // Send data to Streamlit
  }, []);


  // setFrameHeight should be called on first render and evertime the size might change (e.g. due to a DOM update).
  // Adding the style and theme here since they might effect the visual size of the component.
  useEffect(() => {
    Streamlit.setFrameHeight()
  }, [containerStyle, theme])



  return (
    <div 
      className="grid-container" 
      style={containerStyle}
    >
      
      {grid_layout.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <button
            key={`${rowIndex}-${colIndex}`}
            className="grid-item"
            style={{
              gridColumn: `span ${cell.col_span || 1}`,
              gridRow: `span ${cell.row_span || 1}`,
              backgroundColor: cell.background_color,
              color: cell.text_color,
              padding: `${cell_height || 10}px`,
            }}
            onClick={() => handleClick(cell.label)}
          >
            {cell.label}
          </button>
        ))
      )}
    </div>
  )
}

// "withStreamlitConnection" is a wrapper function. It bootstraps the
// connection between your component and the Streamlit app, and handles
// passing arguments from Python -> Component.
//
// You don't need to edit withStreamlitConnection (but you're welcome to!).
export default withStreamlitConnection(StreamlitGrid)
