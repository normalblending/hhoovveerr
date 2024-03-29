import { useForField } from "../context";
import { Vec } from "../../../LevelEditor/store/currentProject/tree/types";
import { useCallback } from "react";

import {
    DragHandler,
    DragEvent,
} from "bbuutoonnss";

export interface Vec2DragForProps {
    name: string;
    text?: string;
    className?: string;
    angle?: number;
}

export function Vec2DragFor(props: Vec2DragForProps) {

    const { name, text, angle, className } = props;
    const { value, handleChange } = useForField<Vec>(name);

    const handleDragChange = useCallback(({ x, y, isDragEnd }: DragEvent, e: MouseEvent, savedValue?: Vec) => {
        savedValue && handleChange([savedValue[0] + x, savedValue[1] + y], !isDragEnd);
    }, [handleChange]);
    return (
        <DragHandler<Vec>
            angle={angle}
            saveValue={value}
            onDrag={handleDragChange}
            className={className}
            pointerLock={false}
        >{text || name} {value[0]},{value[1]}</DragHandler>
    );
}
