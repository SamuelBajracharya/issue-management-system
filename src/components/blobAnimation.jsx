import React, {useEffect, useRef} from "react";
import {gsap} from "gsap";
import {MorphSVGPlugin} from "gsap/MorphSVGPlugin";

gsap.registerPlugin(MorphSVGPlugin);

const BlobAnimation = () => {
  const blobRef = useRef();
  const blobContainerRef = useRef();

  useEffect(() => {
    gsap.to(blobRef.current, {
      duration: 3,
      repeat: true,
      yoyo: true,
      ease: "linear",
      morphSVG: {
        shape:
          "M457.5,284Q450,318,423,351Q396,384,353.5,408.5Q311,433,255,436.5Q199,440,148.5,412.5Q98,385,78,336.5Q58,288,64,237.5Q70,187,106.5,152.5Q143,118,187,85.5Q231,53,288,63.5Q345,74,368.5,122.5Q392,171,425,210.5Q458,250,457.5,284Z",
      },
    });

    gsap.to(blobContainerRef.current, {
      duration: 50,
      repeat: true,
      ease: "linear",
      rotate: 360
    })
  }, []);

  return (
    <div className="blob-container" ref={blobContainerRef}>
      <svg
        viewBox="0 0 500 500"
        xmlns="http://www.w3.org/2000/svg"
        style={{width: "100%", height: "100%"}}
      >
        <path
          ref={blobRef}
          fill="var(--color-bg-container)"
          d="M408.5,298.5Q397,347,357,380Q317,413,259.5,429Q202,445,157.5,407Q113,369,76.5,328Q40,287,53.5,228.5Q67,170,112.5,139.5Q158,109,216.5,66.5Q275,24,318.5,79.5Q362,135,395,182.5Q428,230,408.5,298.5Z"
        />
      </svg>
    </div>
  );
};


export default BlobAnimation;
