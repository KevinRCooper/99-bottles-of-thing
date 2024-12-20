type BuildArray<Length extends number, Acc extends unknown[] = []> =
    Acc['length'] extends Length ? Acc : BuildArray<Length, [unknown, ...Acc]>;

type Subtract<A extends number, B extends number> =
    BuildArray<A> extends [...BuildArray<B>, ...infer Rest]
    ? Rest['length']
    : never;

export type BottlesOnTheWall<
    S extends string,
    N extends number,
    Take extends number,
    Acc extends string[] = [],
    Start extends number = N
> = N extends 0
    ? [
        ...Acc,
        `No more bottles of ${S} on the wall, no more bottles of ${S}. Go to the store and buy ${Start} more, ${Start} bottles of ${S} on the wall.`
    ]
    : N extends 1
    ? BottlesOnTheWall<
        S,
        Subtract<N, Take>,
        Take,
        [
            ...Acc,
            `${N} bottle of ${S} on the wall, ${N} bottle of ${S}. Take it down and pass it around, no more bottles of ${S} on the wall.`
        ],
        Start
    >
    : Subtract<N, Take> extends never
    ? BottlesOnTheWall<
        S,
        0,
        Take,
        [
            ...Acc,
            `${N} bottle${N extends 1 ? "" : "s"} of ${S} on the wall, ${N} bottle${N extends 1 ? "" : "s"} of ${S}. Take ${Take} down and pass it around, no more bottles of ${S} on the wall.`
        ],
        Start
    >
    : BottlesOnTheWall<
        S,
        Subtract<N, Take>,
        Take,
        [
            ...Acc,
            `${N} bottle${N extends 1 ? "" : "s"} of ${S} on the wall, ${N} bottle${N extends 1 ? "" : "s"} of ${S}. Take ${Take} down and pass it around, ${Subtract<N, Take> extends 0 ? "no more" : Subtract<N, Take>
            } bottle${Subtract<N, Take> extends 1 ? "" : "s"
            } of ${S} on the wall.`
        ],
        Start
    >;