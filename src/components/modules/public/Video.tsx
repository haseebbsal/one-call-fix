'use client'

export default function Video({url,imgUrl,extraClass}:{url:string,imgUrl:string,extraClass?:string}){
    return (
        <video controls className={`w-full max-w-screen-lg h-auto  absolute top-20 lg:top-24 ${extraClass}`} onTouchStart={(e:any)=>e.target.play()} onClick={(e:any)=>e.target.play()} width="320" height="240"  poster={imgUrl}>
          <source src={url} type="video/mp4"/>
          {/* <source src="movie.ogg" type="video/ogg"> */}
        Your browser does not support the video tag.
        </video>
    )
}