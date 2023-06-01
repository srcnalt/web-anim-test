import { useEffect } from "react";
import { Group } from "three";

const MIXAMO_PREFIX = 'mixamorig';
const POSITION_SUFFIX = '.position';
const MIXAMO_SCALE = 0.01;

export function useClip(fbx: Group, index: number = 0) {
    useEffect(() => {
        const tracks = fbx.animations[index].tracks;

        for (let i = 0; i < tracks.length; i++) {
            if (tracks[i].name.includes(MIXAMO_PREFIX)) {
                tracks[i].name = tracks[i].name.replace(MIXAMO_PREFIX, '');

                if (tracks[i].name.includes(POSITION_SUFFIX)) {
                    for (let j = 0; j < tracks[i].values.length; j++) {
                        tracks[i].values[j] = tracks[i].values[j] * MIXAMO_SCALE;
                    }
                }
            }
        }
    }, [fbx, index]);

    return fbx.animations[index];
}
