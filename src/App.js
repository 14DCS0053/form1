import React, { Component } from 'react';
import './App.css';
const imgCaption = [
  "This is first image caption",
  "This is second image caption",
  "This is third image caption",
  "This is forth image caption",
  "This is fifth image caption",
  "This is sixth image caption"
];
var images = new Array(1, 2, 3, 4, 5, 6).map((img, index) => {
  return { img: `img${index + 1}.jpg`, cap: imgCaption[index] }
})
function S1({ data: { loginId, password }, changeScreen, changeValue }) {
  return (<div className="s1">
    <h1>PWA</h1>
    <h4>Catchpharse</h4>
    <input type="text" placeholder="Login Id" onChange={(e) => changeValue("loginId", e.target.value)} value={loginId} required />
    <input type="password" placeholder="Password" onChange={(e) => changeValue("password", e.target.value)} value={password} required />
    <button onClick={() => changeScreen(1)}>Log In</button>
  </div>)
}
function S2({ data: { f_name, l_name, gender, birth }, changeValue }) {
  return (<div className="s2">
    <h3>What's your name?</h3>
    <input type="text" placeholder="First Name" onChange={(e) => changeValue("f_name", e.target.value)} value={f_name} required />
    <input type="text" placeholder="Last Name" onChange={(e) => changeValue("l_name", e.target.value)} value={l_name} required />
    <h3>What's your gender?</h3>
    <button className={gender == "male" ? "active" : ""} onClick={() => changeValue("gender", "male")}>Male</button>
    <button className={gender == "female" ? "active" : ""} onClick={() => changeValue("gender", "female")}>Female</button>
    <h3>What's your date of birth?</h3>
    <input type="date" placeholder="Date of birth" onChange={(e) => changeValue("birth", e.target.value)} value={birth} required />
  </div>)
}
function S3({ images, changeActiveImage }) {
  return (<div className="images-container">
    {images.map((image, index) => <div className={`image-box`} onClick={() => changeActiveImage(`img${index + 1}.jpg`)} title="click to see larger image">
      <div className={`caption`}>{image.cap}</div>
      <img src={image.img} />
      <div className="cover"></div>
    </div>)}
  </div>)
}
class App extends Component {
  state = {
    current_screen: 1,
    formData: {
      loginId: "",
      password: "",
      f_name: "",
      l_name: "",
      gender: "male",
      birth: ""
    },
    images: images,
    activeImage: ""
  }
  changeScreen = value => {
    const { current_screen } = this.state;
    if (value == 1) {
      if (current_screen == 1) {
        const { formData: { loginId, password } } = this.state;
        if (!loginId || !password) {
          return alert("all feilds are required")
        }
      }
      else if (current_screen == 2) {
        const { formData: { f_name, l_name, birth } } = this.state;
        if (!f_name || !l_name || !birth) {
          return alert("all feilds are required")
        }
      }
    }
    this.setState({
      current_screen: this.state.current_screen + value
    })
  }
  changeValue = (key, value) => {

    this.setState({ formData: { ...this.state.formData, [key]: value } })

  }
  changeActiveImage = img => {
    this.setState({
      activeImage: img
    })
  }
  closeActiveImg = () => {
    this.setState({
      activeImage: ""
    })
  }
  render() {
    console.log(this.state)
    const { current_screen, formData, images, activeImage } = this.state;
    return (
      <div className="App">
        {current_screen == 1 && <S1 changeValue={this.changeValue} data={formData} changeScreen={this.changeScreen} />}
        {current_screen == 2 && <S2 changeValue={this.changeValue} data={formData} />}
        {current_screen == 3 && <S3 images={images} changeActiveImage={this.changeActiveImage} />}
        {current_screen > 1 && <div className="btn-grp">
          <button onClick={() => this.changeScreen(-1)}>&lt;</button>
          {current_screen < 3 && <button onClick={() => this.changeScreen(1)}> &gt; </button>}
        </div>}
        {activeImage && <div className="Active-box">
          <div className="active-content">
            <div className="active-cap">{images.find(i => i.img == activeImage).cap}</div>
            <img src={activeImage} />
            <button onClick={this.closeActiveImg} title="close"> &#10060;</button>
          </div>
        </div>}
      </div>
    );
  }
}

export default App;
