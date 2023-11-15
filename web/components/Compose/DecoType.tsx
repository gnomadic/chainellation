import { Address } from "../../domain/Domain";
import DecorationRow from "./DecorationRow";

type DecoTypeProps = {
  decoIds: number[];
  decos: string[];
  walletAddress: Address;
  setFunction: (
    svg: string,
    decoAddress: Address,
    decoId: number,
    layerName: string,
    layerId: number
  ) => void;
  chainellationId: number;
  filterOn: number;
  title: string;
  chain: string;
  layerName: string;
};

export default function DecoType(props: DecoTypeProps) {
  return (
    <div className="mt-8 ">
      <div className="pt-2 text-lg text-offwhite">{props.title}</div>
      <div className="grid grid-cols-2 gap-4 mt-8 md:grid-cols-3 lg:grid-cols-4">
        <DecorationRow
          user={props.walletAddress}
          decoType={props.filterOn}
          decoIds={props.decoIds}
          decos={props.decos}
          updateSelection={(
            svg: string,
            decoAddress: Address,
            decoId: number
          ) => {
            props.setFunction(
              svg,
              decoAddress,
              decoId,
              props.layerName,
              props.filterOn
            );
          }}
          chain={props.chain}
          chainellationTokenId={props.chainellationId}
        />
      </div>
    </div>
  );
}
