# React Core Components

*React core components* is the simplest way to import the most used react components in web design like input box for text fields and password fields and number fields etc. With all the validation like ``` isAlphabateOnly! isAlphNumericOnly! isNumberOnly! ```.And the second most important compoent is Button you can pass diffret styles in button that looks pretty awesome. The chatbox component mainly uses for the showing chat messages (like facebook).


```
Give examples
```

### Installing

Install using npm

```
npm install react-core-components
```

and install using yarn

```
yarn add react-core-components
```


## Import Components

there are many components in react-core-components.
* [Input](https://github.com/aaku14n/react-core) - Input
* [Button](https://github.com/aaku14n/react-core) - Button
* [ChatBox](https://github.com/aaku14n/react-core) - Chatbox
* [Grid](https://github.com/aaku14n/react-core) - Grid (for div and images both in dynamic height)
* [Icon](https://github.com/aaku14n/react-core) - Icon
* [Image](https://github.com/aaku14n/react-core) - Image

## Import Styles 
   import "react-core-components/styles.css"

### Input

Input component takes props for styles and functionality both

```
  <Input 
    type="text"
    value={this.state.input}
    isAlphbateOnly={true}
    onChange={(val)=>this.onChange(val)}
  />
```

### Button

Button component takes props for styles and functionality both

```
  <Button
    label="Submit"
    disabled={false}
    onClick={()=>this.onClick()}
  />
```
### ChatBox

Chatbox component takes list of message in shape of array of objects with key ``` message, from ,time ```

```
  <ChatBox
    title="Message"
    messages={
                [
                  {from :"Denny",message:"Hey Denny"},
                  {from :"Denny",message:"I ma here"},
                  {from :"Denny",message:"Yahh...!"}
                ]
             }
  />
```


## Deployment

Add additional notes about how to deploy this on a live system

## Contributing

Please read [CONTRIBUTING.md](https://github.com/aaku14n/react-core/graphs/contributors) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/aaku14n/react-core/releases). 

## Authors

* **Aakarsh Yadav** - *Freelancer* - [PurpleBooth](https://github.com/aaku14n)

See also the list of [contributors](https://github.com/aaku14n/react-core/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


