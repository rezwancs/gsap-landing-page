import React from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/all';
import { useRef } from 'react';
import { useMediaQuery } from 'react-responsive';

const Hero = () => {
    const videoRef = useRef();

    const isMobile = useMediaQuery({ maxWidth: 768 });



    useGSAP(()=> {
        const heroSplit = new SplitText('.title', {
            type: 'chars, words'
        });

        const paragraphSplit = new SplitText('.subtitle', {
            type: 'lines'
        });

        heroSplit.chars.forEach((char, index) => char.classList.add('text-gradient'))

        gsap.from(heroSplit.chars, {
            yPercent: 100,
            duration: 1.8,
            stagger: 0.06,
            ease: 'expo.out',
        })


        gsap.from(paragraphSplit.lines, {
            opacity: 0,
            yPercent: 100,
            duration: 1.8,
            stagger: 0.06,
            ease: 'expo.out',
            delay: 1,
        })


        gsap.timeline({
            scrollTrigger: {
                trigger: "#hero",
                start: "top top",
                end: "bottom top",
                scrub: true,
            }
        })
        .to('.left-leaf', { y: 200 }, 0)
        .to('.right-leaf', { y: -200 }, 0)

        const startValue = isMobile ? 'top 50%' : 'center 60%';
        const endValue = isMobile ? '120% top' : 'bottom top';

        const videoTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: "video",
                start: startValue,
                end: endValue,
                scrub: true,
                pin: true,
            }
        })
        
        videoRef.current.onloadedmetadata = () => {
            videoTimeline.to(videoRef.current, {
                currentTime: videoRef.current.duration,
            })
        }


    }, [])



    return (
    <>
        <section id="hero" className="noisy">
            <h1 className="title">MOJITO</h1>

            <img
                src="/images/hero-left-leaf.png"
                alt="hero-left-leaf"
                className="left-leaf"
            />

            <img
                src="/images/hero-right-leaf.png"
                alt="hero-right-leaf"
                className="right-leaf"
            />


            <div className="body">
                <div className="content">
                    <div className="space-y-5 hidden md:block">
                        <p>Cool. Crisp. Classic.</p>
                        <p className="subtitle">
                            Sip the sprit <br /> of Summer
                        </p>
                    </div>

                    <div className="view-cocktails">
                        <p className="subtitle">
                            Every cocktail on our menu is a blend of premium ingredients, flair and timeless recipes - designed to delight your senses.
                        </p>
                        <a href="#cocktails">View Cocktails</a>
                    </div>
                </div>
            </div>
        </section>


        <div className="video absolute inset-0">
            <video
                ref={videoRef}
                src="/videos/output.mp4"
                muted
                playsInline
                preload="auto"
                >

                </video>
        </div>
    </>
  )
}

export default Hero