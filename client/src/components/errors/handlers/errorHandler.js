const errorHandler = (result)=> {
    if (result.errorMessage) {
        return this.setState(
          {
            errorMessage: true,
            errorMessageResponse: result.errorMessage //"no primary server available"
          },
          () => {
            setTimeout(() => {
              this.setState({ errorMessage: false });
            }, 2000);
          }
        );
      }
}

export default errorHandler;