import React from 'react'
import Promise from 'bluebird'
import {PaginationCollection} from '../common/paginationCollection'

const ScrollingHOC = function (DataComponent) {
  return class extends React.Component {
    /**
     * 
     * @param {headers} The headers used in the passed component.
     * @param {fetchData} a function used to fetch data that will be sent to the passed HOC's component.
     * @param {id} the id given to the component
     */
    constructor(props) {
      super(props)
      /**
       * thresholdLevel: this is the height of the screen * the multiple
       */
      this.state = {
        waiting: false,
        thresholdLevel: 1
      }
      // defaults to 10 per page
      let defaultPageSize = props.defaultPageSize || 10
      this.pagination = new PaginationCollection(defaultPageSize, props.maxSize, props.fetchData);
    }
  
    componentDidMount() {
        this.loadNumberOfPages(3)
        this.setupScroll()
    }
  
    componentWillUnmount() {
        window.onscroll = null;
    }
  
    setupScroll() {
        let that = this;
        let pagination = this.pagination
        window.onscroll = function() {
            if (pagination && !pagination.atLastPage() && !that.state.waiting) {
                let scrolledHeight = window.scrollY;
                let scrollHeight = document.documentElement.scrollHeight;
                let heightOfScreen = window.innerHeight;
                let amountLeftToScroll = scrollHeight - scrolledHeight - heightOfScreen;
  
                let threshold = heightOfScreen * (1 + that.state.thresholdLevel);
                let pastThreshold = amountLeftToScroll < threshold;
                if (pastThreshold) {
                    let heightNeededToPassThresholhd = threshold - amountLeftToScroll;
                    let currentNumberOfPages = pagination.currentNumberOfPagesImmediately();
                    let numberOfPagesToLoad = 1;
                    if (currentNumberOfPages > 0) {
                        let averageHeightPerPage = scrollHeight / currentNumberOfPages;
                        let numberOfPagesNeeded = Math.ceil(heightNeededToPassThresholhd / averageHeightPerPage);
                        let numberOfPagesWaitingToComplete = pagination.numberOfPagesWaiting();
                        numberOfPagesToLoad = numberOfPagesNeeded - numberOfPagesWaitingToComplete;
                    }
                    if (numberOfPagesToLoad > 0) {
                        that.setState({waiting: true});
                        that.loadNumberOfPages(numberOfPagesToLoad, currentNumberOfPages)
                    }
                }
            }
        }
    }
  
    loadNumberOfPages(numberOfPagesToLoad, currentNumberOfPages) {
      currentNumberOfPages = currentNumberOfPages || 0
      let that = this
      Promise.each(this.pagination.loadNext(numberOfPagesToLoad), function(item, index, length) {
          let wait = true;
          if (index === (length - 1)) {
              wait = false;
          }
          let pageLoaded = currentNumberOfPages + (index + 1); 
          let data = that.pagination.getAllItemsThrough(pageLoaded)
          that.setState({waiting: wait, data});
      });
    }
  
    render() {
      return (
        <div>
          <DataComponent data={this.state.data} {...this.props} />
        </div>
      )
    }
  }
}

export default ScrollingHOC;
