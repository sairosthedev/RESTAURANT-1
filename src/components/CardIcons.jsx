import React from 'react';

const CardIcons = {
  visa: (
    <svg className="h-6" viewBox="0 0 780 500" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M293.2 348.7L316.6 145.6H365.5L342.1 348.7H293.2Z" fill="#00579F"/>
      <path d="M524.3 151.6C515.5 148.5 501.4 145 484.2 145C426.5 145 385.9 175.5 385.7 218.4C385.4 250.7 414.9 268.6 437 279.7C459.6 291.1 466.9 298.4 466.9 308.2C466.8 324 446.1 331.2 426.8 331.2C400.5 331.2 386.5 327.2 367.3 319.1L360.2 315.3L352.6 358.9C363.3 363.8 385.1 368.1 407.7 368.4C469.2 368.4 509.1 338.3 509.4 293C509.6 267.5 493.5 247.9 456.4 230.6C434.3 219.5 421.1 212.1 421.1 201.2C421.2 191.7 432.5 182.2 458.1 182.2C479.5 181.9 494.7 186.3 506.3 190.8L511.4 193.5L518.9 151.6H524.3Z" fill="#00579F"/>
      <path d="M661.6 145.6H624.8C610.2 145.6 599.2 149.3 592.7 162.9L504.5 348.7H556.5C556.5 348.7 566.7 321.1 569.1 315C576.7 315 635.8 315 645.3 315C647.2 322.9 652.5 348.7 652.5 348.7H698.5L661.6 145.6ZM585.5 282.3C590.5 269.4 612.4 213.4 612.4 213.4C612 213.9 617.5 199.5 620.4 191.1L624.5 211.1C624.5 211.1 638.5 272.1 641 282.3H585.5Z" fill="#00579F"/>
      <path d="M232.9 145.6L183.7 286.5L178.5 261.8C169.6 230.3 139.7 196.3 106.5 179.4L151.7 348.5H204.1L285.1 145.6H232.9Z" fill="#00579F"/>
      <path d="M131.9 145.6H48.2L47.3 149.3C113.1 165.6 156.1 209.5 178.5 261.8L160.2 167.8C157.4 153.9 145.7 146.2 131.9 145.6Z" fill="#FAA61A"/>
    </svg>
  ),
  mastercard: (
    <svg className="h-6" viewBox="0 0 780 500" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M490 250C490 353.1 406.1 437 303 437C199.9 437 116 353.1 116 250C116 146.9 199.9 63 303 63C406.1 63 490 146.9 490 250Z" fill="#EB001B"/>
      <path d="M664 250C664 353.1 580.1 437 477 437C373.9 437 290 353.1 290 250C290 146.9 373.9 63 477 63C580.1 63 664 146.9 664 250Z" fill="#F79E1B"/>
      <path d="M477 437C373.9 437 290 353.1 290 250C290 146.9 373.9 63 477 63C580.1 63 664 146.9 664 250C664 353.1 580.1 437 477 437ZM477 93C390.5 93 320 163.5 320 250C320 336.5 390.5 407 477 407C563.5 407 634 336.5 634 250C634 163.5 563.5 93 477 93Z" fill="#FF5F00"/>
    </svg>
  ),
  amex: (
    <svg className="h-6" viewBox="0 0 780 500" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M740 500H40C17.9086 500 0 482.091 0 460V40C0 17.9086 17.9086 0 40 0H740C762.091 0 780 17.9086 780 40V460C780 482.091 762.091 500 740 500Z" fill="#2E77BC"/>
      <path d="M390 250L340 150L290 250L340 350L390 250ZM490 150L440 250L490 350H590L540 250L590 150H490Z" fill="white"/>
    </svg>
  ),
  discover: (
    <svg className="h-6" viewBox="0 0 780 500" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M740 500H40C17.9086 500 0 482.091 0 460V40C0 17.9086 17.9086 0 40 0H740C762.091 0 780 17.9086 780 40V460C780 482.091 762.091 500 740 500Z" fill="#F8F8F8"/>
      <path d="M390 150C457.32 150 512 204.68 512 272C512 339.32 457.32 394 390 394C322.68 394 268 339.32 268 272C268 204.68 322.68 150 390 150Z" fill="#F48024"/>
      <path d="M580 150H680V350H580V150Z" fill="#F48024"/>
    </svg>
  ),
  unknown: (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
      <path d="M3 10H21" stroke="currentColor" strokeWidth="2"/>
    </svg>
  )
};

export default CardIcons; 