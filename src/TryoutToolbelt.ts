import { Number } from "ts-toolbelt";
import { IsPositive } from "ts-toolbelt/out/Number/IsPositive";

type PositiveNumber<N extends number> = IsPositive<N> extends 0 ? never : N;

type MultiArray<T, N extends number> = PositiveNumber<N> extends never
    ? never
    : N extends 1
    ? T[]
    : MultiArray<T, PositiveNumber<Number.Sub<N, 1>>>[];

const array3: MultiArray<number, 3> = [[[0]]];

type OptionalWhitespace = `${"" | " "}`;
type Coordinate<T extends "end" | undefined = undefined> =
    `${number}${T extends "end" ? "" : ","}${OptionalWhitespace}`;
type TabulaCoords =
    `${Coordinate}${Coordinate}${Coordinate}${Coordinate<"end">}`;

//type CoordSet<Count extends number> = PositiveNumber<Count> extends never
//    ? never
//    : Count extends 1
//    ? `${Coordinate<"end">}`
//    : `${Coordinate}${CoordSet<PositiveNumber<Number.Sub<Count, 0>>>}`;
