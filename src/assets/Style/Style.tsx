import { ErrorMessage } from "formik";
import React, { ReactNode } from "react";

type StyleProps = {
    title : string,
}

type MidProps = {
    children : ReactNode,
}

type waringProp = {
    children2 : ReactNode
}

export function Style({title}: StyleProps) {
    return(
        <>
            <h1 className="text-4xl font-bold underline" style={{ textAlign: "center", margin: "10px", marginBottom: "2rem" }}>{title}</h1>
        </>
    )
}

export function Mid({children}: MidProps) {
    return(
        <>
            <div style={{
                display: "grid", gap: "2rem 1rem", justifyContent: "flex-start", gridTemplateColumns://this is for the label
                //this is for the actual input 
                "auto minmax(auto,300px)"
            }}>{children}</div>
        </>
    )
}

export function warn({children2}: waringProp){
    return(
        <>
            <div className="text-red-600">{children2}</div >
        </>
    )
}