import React, { useState, useEffect } from 'react'
import { ContentWrapper } from './index.styled'
// import ImageLightBox from './ImageLightBox'
import ImageGallery from './ImageGallery'
import { Photo } from '../../types/photo'
import { useNavigate } from "react-router-dom";

interface Props {
  content: string
  title: string
  slug: string
  photos?: Photo[]
}

export const PostContent: React.FC<Props> = ({ content, photos, title, slug }: Props): React.ReactElement => {

  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const contentRef: any = React.createRef()

  const [photoIndex, setPhotoIndex] = useState<number>(0)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [lightBoxImages, setLightBoxImages] = useState<string[]>([])

  useEffect(() => {
    if (contentRef.current) {
      const imageList = contentRef.current.querySelectorAll('img')
      let lightBoxImages: string[] = []
      imageList.forEach((img: HTMLImageElement, i: number) => {
        img.setAttribute('data-image-id', i.toString())
        lightBoxImages = [...lightBoxImages, img.src]
      })

      setLightBoxImages(lightBoxImages)
      // eslint-disable-next-line
    }
  }, [setLightBoxImages])

  const checkTargetClick = (e: React.MouseEvent<HTMLElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const element: any = e.target
    const dataId = element.getAttribute('data-image-id')
    if (dataId) {
      setIsOpen(true)
      setPhotoIndex(dataId)
    }
  }

  const openLightBox = (index: number) => {
    setIsOpen(true)
    setPhotoIndex(index)
  }

  const goHome = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    navigate(`/${slug}`, { replace: false });
  }

  return (
    <ContentWrapper ref={contentRef}>

      {/* <ImageLightBox
          isOpen={isOpen}
          photoIndex={photoIndex}
          lightBoxImages={lightBoxImages}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() => setPhotoIndex((photoIndex + lightBoxImages.length - 1) % lightBoxImages.length) }
          onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % lightBoxImages.length) }
      /> */}

        <section>
          <p>
            <a onClick={goHome}>Home</a> {'>'} {title}
          </p>
        </section>
          
        <div onClick={e => checkTargetClick(e)} dangerouslySetInnerHTML={{__html: content }}></div>

        <ImageGallery openLightBox={openLightBox} lightBoxImageCount={lightBoxImages.length} images={photos} />

    </ContentWrapper>
  )

}

export default PostContent