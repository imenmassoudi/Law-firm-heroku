import React, { useRef } from "react";
import { Button } from "react-bootstrap";
import ReactToPrint from "react-to-print";
import Dossiers from "../List-dossiers-component/Dossiers";

const PrintComponent = () =>  {

    return (
        <div>
            <ReactToPrint
                trigger={() => {
                    // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                    // to the root node of the returned component as it will be overwritten.
                    return <a href="#">Print this out!</a>;
                }}
                content={() => Dossiers}
            />
            <Dossiers ref={el => (Dossiers = el)} />
        </div>
    );
}

export default PrintComponent