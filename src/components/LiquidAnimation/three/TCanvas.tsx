import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, VFC } from 'react';
import * as THREE from 'three';
import { Background } from './Background';
import { Lense } from './Lense';
import { TextPlane } from './TextPlane';
import {
	oneFragmentShader, oneVertexShader, twoFragmentShader, twoVertexShader
} from './glsl/shader';

export const TCanvas: VFC = () => {
    const OrthographicCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, -10, 10)

    return (
        <Canvas camera={OrthographicCamera} dpr={window.devicePixelRatio}>
            <Suspense fallback={null}>
                <Background />
                {window.innerWidth <= 768 ? <></> : <Lense />}
                <TextPlane
					text={['Creating Communities', 'Through', 'Art Events']}
					vertexShader={oneVertexShader}
					fragmentShader={oneFragmentShader}
				/>
				<TextPlane
					text={['Creating Communities', 'Through', 'Art Events']}
					vertexShader={twoVertexShader}
					fragmentShader={twoFragmentShader}
				/>
            </Suspense>
        </Canvas>
    )
}
