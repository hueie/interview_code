let PB, endpoint;
describe('Testing the functionality, this is the checklist', () => {
  beforeEach(function () {
    PB = new ProgressBar();
    endpoint = {
      "buttons": [
        10,
        38,
        -13,
        -18
      ],
      "bars": [
        62,
        45,
        62
      ],
      "limit": 230
    }
    PB.init(endpoint);
  })

  it('should init data', () => {
    expect(PB.limit).toBe(230);
    expect(PB.selectedProgressbar).toBe(0);
    expect(PB.buttons.length).toBe(4);
    expect(PB.bars.length).toBe(3);
  })

  it('set selected Progress bar index', () => {
    PB.setSelectProgressBar(1)
    expect(PB.selectedProgressbar).toBe(1)
  })
  it('sum value to selected progress bar', () => {
    expect(PB.bar)
    //normal
    PB.bars[0] = 65;
    sum = PB.calculateSum(0, 20)
    expect(sum).toBe(85);

    //- value
    sum = PB.calculateSum(0, -90)
    //-5 to be 0
    expect(sum).toBe(0);
  })
  it('check width percentage and bar color style by using sum with limit', () => {
    PB.limit = 100;
    //zero
    style = PB.checkBarStyle(0);
    expect(style.width).toBe('0%');
    expect(style.backgroundColor).toBe('skyblue');

    //normal
    style = PB.checkBarStyle(65);
    expect(style.width).toBe('65%');
    expect(style.backgroundColor).toBe('skyblue');

    //above limit
    style = PB.checkBarStyle(110);
    expect(style.width).toBe('100%');
    expect(style.backgroundColor).toBe('red');
  })
})

describe('Testing DOM manipulation', () => {
  //Initial Default 
  beforeEach(function () {
    PB = new ProgressBar();
    Dom = new DomManipulation();
    endpoint = {
      "buttons": [
        10,
        38,
        -13,
        -18
      ],
      "bars": [
        62,
        45,
        62
      ],
      "limit": 230
    }
    PB.init(endpoint);
  })
 
  it('should initialze Title Span Area', () => {
      const span = document.createElement('span');
      span.innerText = "Progess Bars Demo"
      span.id = "TitleSpan"
      expect(Dom.createTitleArea()).toEqual(span);    
  })

  it('should click button', function () {
    const btn = Dom.createButton(endpoint.buttons[0]);
    //btnArea.getElementsByTagName('button')[0].click();
    expect(btn.value).toBe('10')
    btn.click();
    //62 + 10 (click)
    expect(PB. bars[0]).toBe(72)
  })
})
