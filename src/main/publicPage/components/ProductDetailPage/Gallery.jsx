import React from "react";
import { Container, Divider, Button, Image as ImageUI } from "semantic-ui-react";
import {
  CarouselProvider,
  Slide,
  Slider,
  Dot,
  Image} from "pure-react-carousel";

export default class Gallery extends React.Component {
  render() {
    const { images } = this.props;
    return (
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={100}
        totalSlides={images.length}
        orientation={'vertical'}
      >
        <Slider>
          {images.map((img, key) => {
            return (
              <Slide tag="a" index={key} key={key}> 
                <Image size="large" src={img} />
              </Slide>
            );
          })}
        </Slider>
        <Divider />
        <Container textAlign="center">
          <Button.Group size="mini">
            {[...Array(images.length).keys()].map(index => (
              <Button  as={Dot} key={index}  basic slide={index}  style={{marginLeft : '5px', padding : '0'}} ><ImageUI src={images[index]} size='tiny' /></Button>
            ))}
          </Button.Group>
        </Container>
      </CarouselProvider>
    );
  }
}
