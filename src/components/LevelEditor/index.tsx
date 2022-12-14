import styles from './styles.module.css';
import { useKeydown } from 'bbuutoonnss';
import React, { CSSProperties, useMemo } from "react";
import { EditDiv } from "./components/EditDiv";
import { Provider as StoreProvider, useDispatch, useSelector } from 'react-redux';
import { store, useEditorDispatch, useEditorSelector } from './store';
import { deleteDiv, selectDivTreeRoot } from "./store/divTree";
import { selectGameParams, setGameParams } from "./store/gameParams";
import { BorderParams, GameParams, Layout } from "./store/gameParams/types";
import { BlurEnterNumberInputFor, BlurEnterTextInputFor, CheckboxFor, For, ObjectFor, SelectDropFor } from "../For";
import cn from "classnames";
import { EditorParams } from "./store/editorParams/types";
import { selectEditorParams, setEditorParams } from "./store/editorParams";
import { DivTree } from "./components/DivTree";
import { ViewDiv } from "./components/ViewDiv";
import { useHotkeys } from '@mantine/hooks';
import { ActionCreators } from "redux-undo";
import { selectActivePath } from "./store/activePath";
import { ImageBrowser } from "./components/ImageBrowser";
import { Brushes } from "./components/Brushes";
import { DivForm } from "./components/DivForm/DivForm";
import { ActiveDivFormContainer } from "./components/ActiveDivFormContainer";

export interface LevelEditorProps {

}

export const LevelEditor = (function (LevelEditor: React.ComponentType<LevelEditorProps>) {
    return (props: LevelEditorProps) => (
        <StoreProvider store={store}>
            <LevelEditor {...props}/>
        </StoreProvider>
    );
})(function (props: LevelEditorProps) {

    const activePath = useEditorSelector(selectActivePath);
    const root = useEditorSelector(selectDivTreeRoot);
    const gameParams = useEditorSelector(selectGameParams);
    const editorParams = useEditorSelector(selectEditorParams);
    const dispatch = useEditorDispatch();

    // console.log(activePath);

    useHotkeys([
        ['mod+S', () => console.log('save')],
        ['mod+X', () => console.log('cut')],
        ['mod+V', () => console.log('paste')],
        ['mod+C', () => console.log('copy')],
        ['mod+Z', () => dispatch(ActionCreators.undo())],
        ['mod+shift+Z', () => dispatch(ActionCreators.redo())],
        ['Backspace', () => dispatch(deleteDiv({ path: activePath }))],
    ]);
    // useKeydown((event: KeyboardEvent) => {
    //     if (event.key == "Backspace") {
    //         console.log("Backspace Pressed");
    //
    //         // dispatch(deleteDiv({ path: activePath }));
    //         // dispatch(set)
    //         //
    //         // setChildren(path.reduce((res, i,  index) => {
    //         //     res[i] =
    //         // }, children))
    //
    //     }
    // }, [activePath]);

    const backgroundStyle = useMemo<CSSProperties>(() => ({
        background: gameParams.background
    }), [gameParams]);

    const gameStyle = useMemo<CSSProperties>(() => ({
        background: gameParams.background,
    }), [gameParams]);

    // console.log('LE', root.children.length)

    return (
        <div
            className={cn(styles.levelEditor, {
                [styles.center]: gameParams.layout === Layout.Center,
                [styles.topLeft]: gameParams.layout === Layout.TopLeft,
            })}
            style={backgroundStyle}
        >
            {/*<div className={styles.under}></div>*/}
            {/*<div className={styles.right}>*/}
            {/*    */}

            {/*</div>*/}


            <div className={styles.leftColumn}>

                <For<EditorParams>
                    className={styles.gameParamsForm}
                    value={editorParams}
                    onChange={(value: EditorParams) => dispatch(setEditorParams(value))}
                >
                    <CheckboxFor name="hideInactivePath"></CheckboxFor>
                    <BlurEnterNumberInputFor name="inactivePathOpacity"></BlurEnterNumberInputFor>
                    {/*<CheckboxFor name="draw"></CheckboxFor>*/}
                    <CheckboxFor name="view"></CheckboxFor>
                </For>
                <For<GameParams>
                    className={styles.gameParamsForm}
                    value={gameParams}
                    onChange={(value: GameParams) => dispatch(setGameParams(value))}
                >
                    <BlurEnterTextInputFor name="background"></BlurEnterTextInputFor>
                    <SelectDropFor
                        getText={(i: any) => i} getValue={(i: any) => i} name="layout"
                        items={Object.values(Layout)}></SelectDropFor>
                </For>
                <ImageBrowser/>
                <Brushes/>
            </div>
            <div className={styles.editorViewport}>
                <EditDiv isRoot state={root}/>

                {editorParams.view && (
                    <div className={styles.view}>
                        <ViewDiv isRoot state={root}/>
                    </div>
                )}

            </div>
            <div className={styles.rightColumn}>

                <DivForm className={styles.divForm} path={activePath}/>
                <DivTree className={styles.divTree}/>
            </div>

            <ActiveDivFormContainer/>


            {/*<div className={styles.leftBottom}>*/}
            {/*</div>*/}
            {/*<div className={styles.rightBottom}>*/}
            {/*</div>*/}
        </div>
    );
});
