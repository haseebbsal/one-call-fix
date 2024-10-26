'use client'

export default function Video({url,imgUrl,extraClass}:{url:string,imgUrl:string,extraClass?:string}){
    return (
        <video onClick={(e:any)=>{
          console.log(e.target.paused)
          if(e.target.paused){
            e.target.play()
            return
          }
          e.target.pause()

          }} onEnded={(e:any)=>{
            e.target.currentTime=0
            console.log('ended')
          }} className={`w-full max-w-screen-lg h-auto  absolute top-20 lg:top-24 ${extraClass}`}  width="320" height="240"  poster={imgUrl}>
          <source src={url} type="video/mp4"/>
          {/* <source src="movie.ogg" type="video/ogg"> */}
        Your browser does not support the video tag.
        </video>
    )
}