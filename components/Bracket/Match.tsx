import * as React from "react";
import { getWinners } from "../../utils/generateMatchUp";
import useBounds from "../hooks/useBounds";
import Contender, { Props as ContenderProps } from "./Contender";
import Connector from "./Connector";
import { BracketStoreContext } from "./Store";
import { sumPreviousHeights } from "./utils";

interface Props extends React.SVGProps<SVGGElement> {
  contenders: ContenderProps[];
  margin?: number;
  hasConnectors?: boolean;
  round?: number;
}

const Match = React.forwardRef<SVGGElement, Props>(
  (props, ref): JSX.Element => {
    const {
      contenders,
      hasConnectors,
      margin = 50,
      height,
      round = 0,
      ...restProps
    } = props;
    const { state } = React.useContext(BracketStoreContext);
    const matchHeight = Number(height);
    const contendersBoundsRef: any = React.useRef([]);
    const match = contenders.map((c) => c.name);
    const winner = React.useMemo(
      () => getWinners([match], state.packages!)[0],
      [match, state.packages],
    );

    return (
      <g ref={ref} {...restProps}>
        {contenders.map((contender, index) => {
          const highlight = state.highlight === contender.name;
          const shouldDim = !highlight && state.highlight !== "";

          const [contenderBounds, contenderRef] = useBounds();
          contendersBoundsRef.current![index] = contenderBounds;
          const sumPreviousHeight = sumPreviousHeights(
            contendersBoundsRef.current,
            index,
            margin,
          );

          return (
            <React.Fragment key={contender.name}>
              {hasConnectors && (
                <Connector
                  index={index}
                  matchWidth={250}
                  matchHeight={matchHeight || 250}
                  round={round}
                  shouldDim={
                    shouldDim ||
                    (state.highlight !== "" && winner !== contender.name)
                  }
                />
              )}
              <Contender
                ref={contenderRef}
                logo={contender.logo}
                name={contender.name}
                y={sumPreviousHeight}
                round={round}
                shouldDim={shouldDim}
                match={match}
              />
            </React.Fragment>
          );
        })}
      </g>
    );
  },
);

Match.displayName = "Match";

export default Match;
