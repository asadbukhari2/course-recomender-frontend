import React from "react";

import classes from "./Spinner.module.css";

function Spinner(props) {
  return (
    <section>
      <div className={classes.Loader}>
        <div className={classes.Spinner}>
          <div className={classes.Container}>
            <div className={classes.Hex0} />
            <div className={classes.Hex120} />
            <div className={classes.Hex240} />
            <div className={classes.Spinner}>
              <div className={classes.Container}>
                <div className={classes.Hex0} />
                <div className={classes.Hex120} />
                <div className={classes.Hex240} />
                <div className={classes.Spinner}>
                  <div className={classes.Container}>
                    <div className={classes.Hex0} />
                    <div className={classes.Hex120} />
                    <div className={classes.Hex240} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*// <div className={classes.Spinner}>*/}
      {/*// <div className={[classes.Cube, classes.Cube1].join(' ')}/>*/}
      {/*// <div className={[classes.Cube, classes.Cube2].join(' ')}/>*/}
      {/*// <div className={[classes.Cube, classes.Cube3].join(' ')}/>*/}
      {/*// <div className={[classes.Cube, classes.Cube4].join(' ')}/>*/}
      {/*// <div className={[classes.Cube, classes.Cube5].join(' ')}/>*/}
      {/*// <div className={[classes.Cube, classes.Cube6].join(' ')}/>*/}
      {/*// <div className={[classes.Cube, classes.Cube7].join(' ')}/>*/}
      {/*// <div className={[classes.Cube, classes.Cube8].join(' ')}/>*/}
      {/*// <div className={[classes.Cube, classes.Cube9].join(' ')}/>*/}
      {/*// </div>*/}
    </section>
  );
}

export default Spinner;
