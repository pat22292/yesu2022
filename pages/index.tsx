import React from 'react';
import dynamic from 'next/dynamic'
import axios from 'axios';
import { connect } from "react-redux"
import { setProducts, setSelectedProductsNull } from "../redux/actions/product"
import NavBar from "../Layouts/Navbar"
import Footer from "../Layouts/footer"
import Head from 'next/head';


const DynamicTable = dynamic(() => import('../components/table'),
  { loading: () => <p>...</p> }
)

function Home(props) {
  const { useState, useEffect } = React;
  const { product, setProduct } = props;
  // const [selectedFile, setselectedFile] = useState(null);
  const [openModal, setOpenModal] = useState(true);
  const _setSelectedProductsNull = (e) => {
    props.setSelectedProductsNull(e);
  }
  const Svg = () => {
    return (
      <div>

        <svg version="1.2" baseProfile="tiny" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
          x="0px" y="0px" viewBox="0 0 853.2 613.8" xmlSpace="preserve">
          <g>
            <path fill="none" stroke="#52AE37" strokeWidth="2" d="M418,71.7l22,12.7c2.5,1.4,4,4.1,4,6.9v25.4c0,2.9-1.5,5.5-4,6.9l-22,12.7
		c-2.5,1.4-5.5,1.4-8,0l-22-12.7c-2.5-1.4-4-4.1-4-6.9V91.3c0-2.9,1.5-5.5,4-6.9l22-12.7C412.5,70.2,415.5,70.2,418,71.7z"/>

            <image width="5" height="17" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAARCAYAAAAVKGZoAAAACXBIWXMAAAsSAAALEgHS3X78AAAA
GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACdJREFUeNpiYEACKg80N4FoJgZ8
AKYKp0omorSSpn2oCGL1KkCAAQCrKgeXD7AQMgAAAABJRU5ErkJggg==" transform="matrix(1 0 0 1 435 168.2348)">
            </image>
            <path fill="#2E2454" d="M387,194.4C387,194.4,387,194.4,387,194.4C387,194.3,387,194.4,387,194.4L387,194.4z" />
            <path fill="#2E2454" d="M395.1,193.2c1.1-0.1,2.1-0.2,3.2-0.3l-0.1-0.1l-1.6,0.2L395.1,193.2z" />
            <path fill="#8C49BF" d="M405.3,157.7c0,0-11.2,0.4-18.7,8.2c-0.5,0.5-1,1.1-1.5,1.6c0,0-27,32.3-29.9,43.5l3.8,2.8l3.3,2.5
		c9.9-5.9,34-40.3,34-40.3l0.1-0.1l2.1,1.5l9.6-14.7L405.3,157.7z"/>
            <path fill="#572188" d="M374.6,189.7l8.4-10.9c0.9-1.2,1.4-2.7,1.4-4.2c0-1.5-0.6-3-1.5-4.2c-3.5,4.3-10.4,12.9-16.4,21.4
		c1.4,0.6,3,0.8,4.5,0.4C372.4,191.9,373.7,191,374.6,189.7L374.6,189.7z"/>
            <path fill="#572188" d="M385.2,182.4l-8.4,10.9c-0.9,1.2-1.4,2.7-1.4,4.2c0,1.5,0.5,3,1.4,4.2c6.3-7.7,12.8-16.3,16.4-21.4
		c-1.4-0.6-3-0.7-4.4-0.3S386.1,181.2,385.2,182.4L385.2,182.4z"/>
            <path fill="#8C49BF" d="M422.7,158.1c0,0-13.8-1.7-19.4,0l7.5,8.1L422.7,158.1z" />
            <path fill="#8C49BF" d="M405.3,157.7c0,0-11.2,0.4-18.7,8.2c-0.5,0.5-1,1.1-1.5,1.6c0,0-0.9,1.1-2.4,2.9c1,1.2,1.5,2.7,1.5,4.2
		s-0.5,3-1.4,4.2l-8.3,10.9c-0.9,1.2-2.3,2.1-3.8,2.5c-1.5,0.4-3.1,0.2-4.5-0.4c-5.3,7.5-10.5,16.7-11.6,20.9l4.3,1l2.4,1.6
		c3.6-2.2,9.9-7.2,15.5-13.9c-0.9-1.2-1.4-2.6-1.4-4.2c0-1.5,0.5-3,1.4-4.2l8.4-10.9c0.9-1.2,2.2-2.1,3.7-2.5c1.5-0.4,3-0.3,4.4,0.3
		c1.9-2.6,3-4.2,3-4.2l0.1-0.1l2.1,1.5l9.6-14.7L405.3,157.7z"/>
            <path fill="#2E2454" d="M402.5,158.1c-3.8,0.6-10.7,2.5-16,7.9c-0.5,0.5-1,1.1-1.5,1.6l-0.1,0.1c1.7,1,3.7,1.5,5.7,1.5
		c2,0,4-0.5,5.8-1.5c1.8-1,3.2-2.4,4.3-4.1C401.8,162,402.5,160.1,402.5,158.1L402.5,158.1z"/>
            <path fill="#8C49BF" d="M419.9,157.7c0.9,0.1,1.9,0.2,2.8,0.3c0.1,2,0.7,3.9,1.8,5.6c1.1,1.7,2.5,3.1,4.3,4.1
		c1.8,1,3.7,1.5,5.7,1.4c2,0,4-0.5,5.7-1.5c1.9,2.3,27,32.6,29.8,43.4l-3.8,2.8l-3.3,2.5c-9.9-5.9-34-40.3-34-40.3l-0.1-0.1
		l-2.1,1.6l-9.6-14.7L419.9,157.7z"/>
            <path fill="#572188" d="M450.7,189.7l-8.4-10.9c-0.9-1.2-1.4-2.7-1.4-4.2s0.6-3,1.5-4.2c3.5,4.3,10.4,12.9,16.4,21.4
		c-1.4,0.6-3,0.8-4.5,0.4C452.9,191.9,451.6,191,450.7,189.7z"/>
            <path fill="#572188" d="M440.1,182.4l8.4,10.9c0.9,1.2,1.4,2.7,1.4,4.2c0,1.5-0.5,3-1.5,4.2c-6.4-7.7-12.8-16.3-16.4-21.4
		c1.4-0.6,2.9-0.7,4.4-0.3C437.9,180.3,439.2,181.2,440.1,182.4L440.1,182.4z"/>
            <path fill="#2E2454" d="M422.7,158.1c3.8,0.6,10.7,2.5,16,7.9c0.5,0.5,1,1.1,1.5,1.6l0.1,0.1c-1.7,1-3.7,1.5-5.7,1.5
		c-2,0-4-0.5-5.8-1.5c-1.8-1-3.2-2.4-4.3-4.1C423.4,162,422.8,160.1,422.7,158.1L422.7,158.1z"/>
            <path fill="#8C49BF" d="M423.2,173.2H403V158l17.4-0.3L423.2,173.2z" />
            <path fill="#2E2454" d="M406,147.2v11.8c0,2.3,2.9,4.1,6.5,4.1c3.6,0,6.5-1.9,6.5-4.1v-11.8H406z" />
            <path fill="#8C49BF" d="M424.5,203.3c-0.1-3.7,1-7.4,2.9-10.5c-6.5-0.6-13.5-1-19.7-1c-3.5,0-6.4,0.1-8.9,0.3l0,0.1l-0.9,0.1
		l0.1,0.1c1.9,3.3,2.9,7.1,2.9,10.9c-1.2,0.1-2.3,0.3-3.4,0.6c5-0.9,10.1-1.3,15.2-1.3C416.6,202.5,420.6,202.8,424.5,203.3
		L424.5,203.3z"/>
            <path fill="#2E2454" d="M398.9,191.9c-1,0.1-1.9,0.1-2.9,0.2l-6.9,1.3c0,0-0.3,1-0.2,1c-0.7,3.5-1.3,7.7-1.8,12.5
		c0.4-0.2,4.4-2.3,11.8-3.6c1-0.2,2.1-0.4,3.1-0.5C401.9,198.9,400.8,195.2,398.9,191.9L398.9,191.9z"/>
            <path fill="#2E2454" d="M436.9,194.3c-3.6-0.7-7.3-1.2-11-1.6c-1.8,2.8-2.7,6.1-2.6,9.5h0.2c1.9,0.2,3.7,0.5,5.5,0.9
		c3.3,0.6,6.5,1.7,9.6,3C438.1,201.7,437.5,197.7,436.9,194.3z"/>

            <image width="54" height="22" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAAWCAYAAACL6W/rAAAACXBIWXMAAAsSAAALEgHS3X78AAAA
GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAHtJREFUeNrs17sNgDAMRVFfRmIn
1qBgDXZiJRAFEhVKyIc4vNc71klkKcYSs83rbgUyLhMp9XwNKAXGA+YNEm+YUCSeMU9AekLdcYN1
GsE85RwvvZhgggkm2C9gQSuAx28XOQ5pEU6tRrXxtHTLOfF4mpsYONZZLvwhwABl7Sxrs3dG9gAA
AABJRU5ErkJggg==" transform="matrix(1 0 0 1 386 202.2348)">
            </image>
            <path fill="#CE7E9B" d="M402,202.7c0,0-11.1,1.6-14.9,4.2l-0.1,1.2l-0.4,4.4c0,0,7.4,6.2,21.6,5.9
		C408.2,218.5,399.6,212.5,402,202.7z"/>

            <image width="23" height="17" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAARCAYAAAA2cze9AAAACXBIWXMAAAsSAAALEgHS3X78AAAA
GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAGRJREFUeNrUlMEOABAMQ1fxe77W
B04cJA5bEF1EbyJem1EQR6pa5jWAKofCLtw8vDC8gq+MaHDLKEmARrAQ+NC/cLAv891YWKlDk/e3
Dnbqualggd36M6pu7jE+KE+ZBbLUBBgAADgrZmyFm9MAAAAASUVORK5CYII=" transform="matrix(1 0 0 1 417 202.2348)">
            </image>
            <path fill="#29244C" d="M445.7,230.8c0.1-0.2,0.1-0.4,0.2-0.6c0-0.1,0-0.1,0.1-0.2l0.1-0.4l0-0.2c1-4.4-0.3-9.1-2-12.9
		c-1.9-4.3-5.2-7.4-5.2-7.4c-8.9,0.7-17.1,1.1-26.3,1.1h-0.2c-2.3,0-18.6,0.2-25.6-1.2c0,0-2.9,3.1-5.2,7.4c-2.2,4.2-4,9.5-2.6,14.3
		"/>

            <image width="95" height="108" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF8AAABsCAYAAAAMom72AAAACXBIWXMAAAsSAAALEgHS3X78AAAA
GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAcNJREFUeNrs3d1NxUAMRGGckuiJ
NnigDXqiJdB9R+Inu5nN+psCkDhz5DhGIvW0YD5e3z9n/Nznt5da6fesXUHfoYzqBnylMqo78GQJ
BXquiAI9V0KBniuhQM8VUMDnSijQcwUU8LkCCvhcCQV8roACPldAAZ8roIDPFXAAn8sBwbz8JG6x
Pjd+DuCNnZbjp1ifGz/MD6ZYn7Of+as8cFlv22mz+RysZ35L+8FnfmP45j3z28198JkPvoDfCL5N
h/ngC/jgC/jgC/jgC/jgy0n4q/0PGuYL+ODLlDzGPfjMB18S8K2bzAdfwN9+zQSf+eBLEr51k/ng
C/hbr5ngMx98Gw/zwRfw9950wGc++DYe5oMvFzxswWc++B66zO8z78Ff1Xyjx9jZduSAv7L5Ro+x
s+XI+RV89jN/O+sf8Xm+EPg/mW/8jI9PsoasN/OD4P9lPvvHjWXfQA+BPwVfAecXkSEbTNcSzm6A
w9bHbgWMWL2H7u4dChj5vjPlxWnXEka/aE59a92lhFlv95ecDO5awuyTyqX3mruUcNUdK3IsW7GE
xOEwfqlMFpG+1C53Jp5dxkqn8eVv9GfL8HcI+TZfAgwAX3zCnpCUgFUAAAAASUVORK5CYII=" transform="matrix(1 0 0 1 363 46.2348)">
            </image>
            <path fill="#FFFFFF" d="M447.5,105.3c0,6.8-6,12.3-13.3,12.3s-13.3-5.5-13.3-12.3c0-6.8,6-12.2,13.3-12.2S447.5,98.5,447.5,105.3z"
            />
            <path fill="#2E2454" d="M444.5,105c0,7-4.8,12.6-10.7,12.6s-10.7-5.6-10.7-12.6c0-7,4.8-12.6,10.7-12.6
		C439.7,92.4,444.5,98,444.5,105z"/>
            <path fill="#2E2454" d="M434.1,89.4c-7.4,0-14,6.2-16,13.3l2.8,0.7c0.8-2.7,2.4-5.2,4.6-7s4.9-2.8,7.8-3s5.7,0.5,8.1,2
		c2.4,1.5,4.3,3.7,5.4,6.3l4.9-3.8C449.2,91.8,440.8,89.4,434.1,89.4z"/>
            <path fill="#2E2454" d="M446.5,80.6c-0.2-0.2-0.4-0.4-0.6-0.6l-0.6-0.5c-0.2-0.2-0.4-0.3-0.6-0.5l-0.3-0.2l-0.3-0.2
		c-0.2-0.1-0.4-0.3-0.7-0.4c-0.2-0.1-0.6-0.3-0.9-0.5c-3.9-2.2-8.8-2.1-11.8-1.8c-1,0.1-1.9,0.2-2.8,0.4h0c-2.4,0.5-4.6,1.7-6.3,3.4
		l0,0l-0.1,0.1c-0.6,0.6-1.1,1.2-1.5,2l-0.2,0.2l0.2,0.2c0.1,0.1,0.2,0.1,0.2,0.2l0.3,0.2c0.1,0.1,0.2,0.1,0.3,0.2l0.3,0.2
		c0.1,0.1,0.2,0.1,0.3,0.1l0.3,0.1c0.1,0,0.2,0.1,0.3,0.1l0.3,0.1c0.1,0,0.2,0,0.4,0.1l0.4,0c0.1,0,0.2,0,0.4,0c0.2,0,0.5,0,0.7-0.1
		c0.2,0,0.5-0.1,0.7-0.1l0.2,0l0.3-0.2c0.1-0.1,0.4-0.3,0.5-0.4l0.6-0.4c0.4-0.3,0.8-0.5,1.2-0.8c0.4-0.2,0.8-0.5,1.3-0.7l0.7-0.3
		l0.7-0.3c0.4-0.2,0.9-0.4,1.3-0.6c0.4-0.2,0.9-0.3,1.4-0.5c0.2-0.1,0.5-0.1,0.7-0.2c0.2-0.1,0.5-0.1,0.7-0.2c0.2,0,0.5-0.1,0.7-0.1
		l0.7-0.1c0.5,0,1-0.1,1.4-0.1c0.2,0,0.5,0,0.7,0s0.5,0,0.7,0s0.5,0,0.7,0.1l0.7,0.1c0.2,0,0.5,0.1,0.7,0.2l0.3,0.1l0.3,0.1
		c0.5,0.1,0.9,0.3,1.3,0.5c0.2,0.1,0.4,0.2,0.6,0.3l0.3,0.2l0.3,0.2c0.2,0.1,0.4,0.3,0.6,0.4l0.6,0.4c0.2,0.1,0.4,0.3,0.6,0.5
		l0.5,0.5l0.7-0.7L446.5,80.6z"/>
            <path fill="#2E2454" d="M371.4,74.6c0.2-0.1,0.3-0.3,0.5-0.4l0.9-0.7l0.8-0.5l0.4-0.2l0.4-0.2c0.3-0.1,0.6-0.3,0.8-0.4
		c0.2-0.1,0.8-0.3,1.1-0.4c4.7-1.9,10.2-1.1,13.6-0.3c1.1,0.2,2.1,0.5,3.1,0.9c2.6,1,4.9,2.6,6.6,4.8l0,0l0.1,0.1
		c0.6,0.7,1.1,1.6,1.4,2.4l0.2,0.3l-0.3,0.1c-0.1,0.1-0.2,0.1-0.3,0.2l-0.4,0.2c-0.1,0.1-0.2,0.1-0.4,0.2l-0.4,0.1
		c-0.1,0-0.3,0.1-0.4,0.1l-0.4,0.1c-0.1,0-0.3,0.1-0.4,0.1l-0.4,0c-0.1,0-0.3,0-0.4,0h-0.4c-0.1,0-0.3,0-0.4,0
		c-0.3,0-0.5-0.1-0.8-0.2l-0.8-0.3l-0.2-0.1l-0.3-0.2c-0.1-0.2-0.4-0.4-0.6-0.5c-0.2-0.2-0.4-0.4-0.6-0.6c-0.4-0.4-0.8-0.7-1.3-1.1
		c-0.4-0.3-0.9-0.7-1.3-1l-0.7-0.5l-0.7-0.4c-0.5-0.3-0.9-0.6-1.4-0.8c-0.5-0.2-1-0.5-1.5-0.7c-0.3-0.1-0.5-0.2-0.8-0.3
		c-0.3-0.1-0.5-0.2-0.8-0.3c-0.3-0.1-0.5-0.2-0.8-0.3l-0.8-0.2c-0.5-0.1-1.1-0.3-1.6-0.3c-0.3-0.1-0.6-0.1-0.9-0.1
		c-0.2,0-0.4,0-0.6,0h-0.8h-0.8c-0.3,0-0.5,0.1-0.8,0.1c-0.1,0-0.3,0-0.4,0l-0.4,0.1c-0.5,0.1-1.1,0.2-1.6,0.4
		c-0.3,0.1-0.5,0.2-0.8,0.3l-0.4,0.1l-0.4,0.2c-0.2,0.1-0.5,0.2-0.7,0.4l-0.6,0.3c-0.2,0.1-0.6,0.4-0.8,0.5l-0.7,0.5l-0.7-0.9
		L371.4,74.6z"/>
            <path fill="#FFFFFF" d="M371.7,105.3c0,6.8,6,12.3,13.3,12.3c7.4,0,13.3-5.5,13.3-12.3c0-6.8-6-12.2-13.3-12.2
		C377.7,93.1,371.7,98.5,371.7,105.3z"/>
            <path fill="#2E2454" d="M374.7,105c0,7,4.8,12.6,10.7,12.6c5.9,0,10.7-5.6,10.7-12.6c0-7-4.8-12.6-10.7-12.6
		C379.5,92.4,374.7,98,374.7,105z"/>
            <path fill="#2E2454" d="M385.1,89.4c7.4,0,14,6.2,16,13.3l-2.8,0.7c-0.8-2.7-2.4-5.2-4.6-7s-4.9-2.8-7.8-3c-2.8-0.2-5.7,0.5-8.1,2
		c-2.4,1.5-4.3,3.7-5.4,6.3l-4.9-3.8C370,91.8,378.4,89.4,385.1,89.4z"/>
            <path fill="none" stroke="#2E2454" strokeWidth="1.83" strokeLinecap="round" strokeMiterlimit="10" d="M422.4,136.9
		c0,0-9.9-4.5-20.7,0"/>
            <path fill="#FFFFFF" d="M409.4,124.9l-3.4-2.8c1.9-2.6,2.8-5.8,2.5-9C408.6,113.1,411,121.3,409.4,124.9z" />

            <image width="142" height="128" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAI4AAACACAYAAADd91F4AAAACXBIWXMAAAsSAAALEgHS3X78AAAA
GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAsJJREFUeNrs3d1x20AMReFgq0lP
aSHlpAX3lG7syUNePJZHP1xyL/Y7rx5RJHh4AWhsq35syO+fb+9HH/PP31+1Uw2LJPPoLFMRhURb
i7OqMF0lKrKQaBtxOgiTLlARhkBtxdlBmDSBijDkaSXO7tKsLlARhkDx4pAmR54iDHkixSFNpjxF
GgJFiUOabHmKNOSJEIc0PeQp0pBnaXFI00ueIg15lhSHND3lGaTBcuLgWmY+uJV40ri+ZRVpyLNE
qyKNGQfmnXNalbTZp2UN0kCrwmkP+FjpZCBx0Dx1xgonAYkTtRlInYvEkTYSB1LnHHGkjcQx32w8
az0bAFoVzkscbco2WFeJY6Vea71+9H5oVTgncaSN1JE4OGc4NhTjssTRptat7SPBoFUhI3GwmTi2
qT3alcTB1DmHOJiXONZwSBwcEhTEMSCvnTg2qs1alfkGWhUOm3OIA4kD4iBZHIMxJA4OHZCJg7UT
R9sjDnBbHAnRczaRONCqkJdexIHEAXFAHBAHVvErxPHZUPPEcYOhVYE4IA6IA+LAKk4cEAfE8RkR
cUAcgDg2KuJA4qC/OP57FpZMHCs5cUAc2KiIg4O4Ne+OR18AXJo4BmTioOl8813XGc++EBIHeDg0
xqsHMOdIHJhvcsSROhIHG2xTxEF+4mhXefUaigEzjrTZUxypk3MfhidK2kxJHDeSNDEzDlmvr0fs
l7mSZ+061OonvfOvdqxc/+W/dmjX5Fn9uivpxHdJn9Vq/1XdK832zvIk1b0SW0NHedLqXqnzRCd5
EuteyUNoB3lS617pW0uyPMm1H55Y5/3SOp58IWmp0yHlq8sFpcjTpcbj8w/89SbueTCrw5ORKHtK
fW/VtmZd4L83nF0c6/jc+/BdfWvGBf5/w6OLskMbnVWze497b43ryIv7/KavFMGsNaeOXx3rmVp/
CDAAlWakUEyrDyYAAAAASUVORK5CYII=" transform="matrix(1 0 0 1 339 27.2348)">
            </image>
            <path fill="#683099" d="M369,123.3c0,0,1.3,16.7,11.6,30.7c0,0,18.5,1.7,25.4,0.4v-2.1C406,152.3,376.2,146.9,369,123.3z" />
            <path fill="#683099" d="M452.2,121.5c0,0-0.9,28.4-6.7,33.5c0,0-23.3,0.7-27.5-0.5v-2.7C418,151.7,446.8,146.3,452.2,121.5z" />

            <image width="22" height="31" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAfCAYAAADjuz3zAAAACXBIWXMAAAsSAAALEgHS3X78AAAA
GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJRJREFUeNpiZCABnKub/R/GNmpK
ZcSnlpEUw3ABbJYwUmIgPgsYqWUouuFMDFQGMEcxUdO1yIDqLoY5jiYGY7iYWsFAs6AYNXiIG8xI
i6QGKi9Gw5h2xSZNXIxcgzDRwlC4wdRMalR1MbZamokWhlJsML5GCxMtDCXbYEKGggshUlMEMYaC
AAu1DSTaYFINhAGAAAMAzTIxv6lm24cAAAAASUVORK5CYII=" transform="matrix(1 0 0 1 452 90.2348)">
            </image>
            <path fill="#2E2454" d="M466.2,96.7c-5.7,1.1-9.3,13.5-9.4,14l1.3,0.4c0.8-2.7,1.8-5.3,3.2-7.7c0.4,0,0.8,0.2,1.2,0.3
		c0.4,0.2,0.7,0.5,0.9,0.8c0.8,1.1,1.5,3.4,0,8.6l1.3,0.4c1.4-4.6,1.3-7.9-0.2-9.8c-0.6-0.8-1.5-1.3-2.4-1.5
		c1.3-2.1,2.8-3.8,4.5-4.1c1.5-0.3,3,0.5,4.5,2.5l1.1-0.8C470.2,97.2,468.2,96.3,466.2,96.7z"/>
            <path fill="#24E029" d="M473.2,95.3c-0.5,0.9-2.1,3.5-3.8,4.6l1.8,2.7c2.7-1.8,4.7-5.6,4.8-5.8L473.2,95.3z" />
            <path fill="#24E029" d="M459.5,117.3c-0.1,0.3-0.4,0.6-0.7,0.7c-0.3,0.2-0.6,0.3-1,0.3c-0.3,0-0.7-0.1-0.9-0.3
		c-0.3-0.2-0.5-0.5-0.6-0.8c-0.1-0.3-0.1-0.7-0.1-1c0.1-0.3,0.3-0.6,0.5-0.9c0.2-0.2,0.6-0.4,0.9-0.4c0.3-0.1,0.7,0,1,0.1
		c0.2,0.1,0.4,0.2,0.5,0.4s0.3,0.4,0.4,0.6c0.1,0.2,0.1,0.4,0.1,0.7C459.6,116.9,459.6,117.1,459.5,117.3L459.5,117.3z"/>
            <path fill="#2E2454" d="M462.7,116.9c-0.1,0.2-0.2,0.4-0.4,0.5c-0.2,0.1-0.4,0.2-0.6,0.2c-0.2,0-0.4-0.1-0.6-0.2
		c-0.2-0.1-0.3-0.3-0.4-0.5c-0.1-0.2-0.1-0.4,0-0.6c0-0.2,0.2-0.4,0.3-0.5c0.2-0.1,0.3-0.2,0.6-0.3c0.2,0,0.4,0,0.6,0.1
		c0.3,0.1,0.5,0.3,0.6,0.6C462.8,116.3,462.8,116.6,462.7,116.9L462.7,116.9z"/>

            <image width="32" height="29" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAdCAYAAADLnm6HAAAACXBIWXMAAAsSAAALEgHS3X78AAAA
GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAALdJREFUeNrElcENgDAIRUvTidzJ
NTy4hju5kkZvNthA+QBJjy2vnw+Uczuu55SkoFHyZV8pFUASVsj3cmYJWnTCXrEWnZAtAbIMWk+0
6IRmAHRrfh6TlgEJUaMHzxBAGsi5UTPG768HtL9EwNbMRTRUQKqEFbRaf2A1JKESzSohVsDLE4SU
fAaS0HXXQpCHATUQ5NUFUgiYsTgQCQTU2TMQLq2lAXGd9z0IBxGycEYgobufA7kFGABPA1t9Uys5
yQAAAABJRU5ErkJggg==" transform="matrix(1 0 0 1 368 121.2348)">
            </image>

            <image width="12" height="10" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAYAAACALL/6AAAACXBIWXMAAAsSAAALEgHS3X78AAAA
GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAEBJREFUeNpiPFc3+z8DAWDUlMoI
Y4MZpGhiYiARMKFbSZQGYgDM2UzYPEaUDcR4nGRPgwxlIsV0cDyQGnEAAQYAUwAZ3hHOXfIAAAAA
SUVORK5CYII=" transform="matrix(1 0 0 1 445 69.2348)">
            </image>

            <image width="28" height="30" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAeCAYAAAA/xX6fAAAACXBIWXMAAAsSAAALEgHS3X78AAAA
GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAKBJREFUeNrc1cENgCAMhWEwTORO
ruGBNdzJlTQcSIQAtqWvJvbo5cvfkuic4Zz7cQU0UH8LaAACUqA8i+UN17h5U9C80BRM61QBOQ/G
rDDX/fOGz7ppkHs/eGFdl8aj6lrYJ4/GW9ZBCkeYqHBU94axwVlMbaVUjFXYq+NgZFALI4EtTAKR
QG2sCyKgLojEChANFWCNIaBihZIfqXRuAQYANxlPGb2ViSkAAAAASUVORK5CYII=" transform="matrix(1 0 0 1 425 120.2348)">
            </image>

            <image width="101" height="46" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGUAAAAuCAYAAAAx49dgAAAACXBIWXMAAAsSAAALEgHS3X78AAAA
GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAPNJREFUeNrs20EOgjAQRmHb9Hqe
1gNiXLAhaoIWOkO/txWSTt/0pylYbjiUZVnue+9pv9y0Ukp5mNz+tAwD3Sv/zAkMJ+WKXRqBKvVj
8UoFUqwUkEIKSCEFpJACUkAKKegjZabjdysFpJACUkgBKSCFFJBCCkghBWNp2Qt4d6Dqs9VAMra/
ZZVz6fjK+lqimmxSTheSUaDdFyni7nJSZvmeQHyRMm6VZFhl6xjrTLGQpenqbHmdIQXK9oKIRxM9
GyZSfZ/qap8unO1v0pGarGTort7ROqKePTWU6EUd8aw7evx/7xSjF3vGBuTbuEdsgJ4CDABt3U2i
nJ/KxAAAAABJRU5ErkJggg==" transform="matrix(1 0 0 1 360 79.2348)">
            </image>
            <path fill="none" stroke="#683199" strokeWidth="3.38" strokeLinecap="round" strokeMiterlimit="10" d="M403.7,113.9
		c2-6.1,5.3-7.1,7.1-7.1c1.8,0,5.1,0.9,7.2,7"/>
            <path fill="#572188" d="M409.5,86.1c-27,0-49.1-2-49.5-2c-0.8-0.1-1.5-0.5-2-1.1c-0.5-0.6-0.7-1.4-0.6-2.1c0.1-0.8,0.4-1.5,1-2
		c0.6-0.5,1.3-0.8,2.1-0.7c0.6,0.1,56.8,5,99-1c0.4-0.1,0.8-0.1,1.2,0c0.4,0.1,0.8,0.2,1.1,0.5c0.3,0.2,0.6,0.5,0.9,0.9
		c0.2,0.4,0.4,0.8,0.4,1.2c0.1,0.4,0,0.8-0.1,1.2c-0.1,0.4-0.3,0.8-0.6,1.1c-0.3,0.3-0.6,0.6-1,0.8s-0.8,0.3-1.2,0.3
		C444.2,85.3,425.9,86.1,409.5,86.1z"/>
            <path fill="none" stroke="#24E029" strokeWidth="3.05" strokeLinecap="round" strokeMiterlimit="10" d="M397.7,171.5
		c0,0-1.8-8.2,0-12.9"/>
            <path fill="none" stroke="#24E029" strokeWidth="3.05" strokeLinecap="round" strokeMiterlimit="10" d="M427,171.5
		c0,0,1.8-8.2,0-12.9"/>
            <path fill="#24E029" d="M428,189.8l2.9-6.2L428,189.8L428,189.8z" />
            <path fill="#24E029" d="M436.9,194.8l-0.1-0.6h0L436.9,194.8z" />
            <path fill="#24E029" d="M436.7,193.6l0,0.2L436.7,193.6z" />
            <path fill="#24E029" d="M436.3,193.9c0,0,0-0.1,0-0.1l-0.1-0.3l0-0.2c-0.1-0.3-0.1-0.6-0.2-0.8v-0.1c-0.3-1.7-0.7-3.2-1-4.6
		l-3.6-12l-0.1-0.2c-1-2.4-2.5-8.4-7.5-8.4h-23.4c-6.2,0-8.5,12.8-8.5,12.9l-1.5,4.8l-2,9.1c3.7-0.8,7.4-1.3,11.2-1.7
		c2.3-0.2,4.9-0.3,8.1-0.3c5.6,0,11.9,0.3,17.7,0.9l11,1.6L436.3,193.9z"/>
            <path fill="#FFFFFF" d="M419.8,179.2h-0.4l-0.4,0.9l-0.2,0.1h-7.8l-0.3,0.3l-0.3,0.7h7.9l-1.1,1l-0.9,0.9l-0.9,0.9l-0.2,0.2h-8.5
		l-2.8,2h1.9c0,0,0.4,0.2,0.6,0.1c0.2-0.1,0.4-0.2,0.5-0.4l1.1-1.7h6.9c0.7,0,1.3-0.3,1.8-0.7l3.3-3.3c0.1-0.1,0.1-0.2,0.2-0.3
		c0-0.1,0-0.2,0-0.3c0-0.1-0.1-0.2-0.2-0.3C420,179.3,419.9,179.2,419.8,179.2L419.8,179.2z"/>
            <path fill="#FFFFFF" d="M412.3,175.2l-1.7,2h10.5l1.7-2H412.3z" />
            <path fill="#FFFFFF" d="M406.4,183.2h8.6l0.9-1l0.8-1h-7.9l0.6-0.6l1.4-1.4h7.8l1.7-2h-10.5l-3.9,4.5c-0.1,0.1-0.2,0.2-0.2,0.4
		c0,0.2,0,0.3,0,0.5c0.1,0.1,0.2,0.3,0.3,0.4c0.1,0.1,0.3,0.1,0.4,0.1V183.2z"/>
            <path fill="#1D9E1D" d="M393.4,176.4c0,0-0.5,11.6,5.9,16.3l-10.4,1.6C388.9,194.3,391.7,180.2,393.4,176.4z" />
            <path fill="#94D394" d="M431.8,176.1c0,0,0.2,14.3-5.9,17.1l11,1.6C436.9,194.8,434.1,180.4,431.8,176.1z" />
            <path fill="#24E029" d="M369.9,191.8l-4.4,5.2l9,7.6l4.4-5.2L369.9,191.8z" />
            <path fill="#63676B" d="M354.7,203.8l7.4,5.4c0.4,0.3,1,0.4,1.5,0.4c0.5,0,1-0.3,1.4-0.6l16.8-17.2c0.2-0.2,0.3-0.4,0.4-0.6
		c0.1-0.2,0.1-0.5,0.1-0.7c0-0.2-0.1-0.5-0.2-0.7c-0.1-0.2-0.3-0.4-0.5-0.5l-7.4-5.4"/>
            <path fill="#A7A9AC" d="M380.7,191c0.2-0.2,0.3-0.4,0.4-0.6c0.1-0.2,0.1-0.5,0.1-0.7c0-0.2-0.1-0.5-0.2-0.7
		c-0.1-0.2-0.3-0.4-0.5-0.5l-7.4-5.4c-0.4-0.3-1-0.4-1.5-0.4c-0.5,0-1,0.3-1.4,0.6l-16.8,17.2c-0.2,0.2-0.3,0.4-0.4,0.6
		c-0.1,0.2-0.1,0.5-0.1,0.7c0,0.2,0.1,0.5,0.2,0.7c0.1,0.2,0.3,0.4,0.5,0.5l7.4,5.4c0.4,0.3,1,0.4,1.5,0.4c0.5,0,1-0.3,1.4-0.6
		L380.7,191z"/>
            <path fill="#2E2454" d="M365.6,205.9l-9.7-7.1l12.7-13l9.7,7.1L365.6,205.9z" />
            <path fill="#24E029" d="M376.2,187.7c-0.2,0.2-0.4,0.3-0.6,0.3c-0.2,0-0.5,0-0.7-0.2c-0.1-0.1-0.2-0.1-0.2-0.2
		c-0.1-0.1-0.1-0.2-0.1-0.3c0-0.1,0-0.2,0-0.3c0-0.1,0.1-0.2,0.2-0.3c0.2-0.2,0.4-0.3,0.6-0.3c0.2,0,0.5,0,0.7,0.2
		c0.1,0.1,0.2,0.1,0.2,0.2c0.1,0.1,0.1,0.2,0.1,0.3c0,0.1,0,0.2,0,0.3C376.4,187.6,376.3,187.7,376.2,187.7L376.2,187.7z"/>
            <path fill="#9446CE" d="M363.7,194.4l0.2,0.8h0.3h0.1l0.1-0.6l3.2,2.6h0.3h0.2l-3-2.2l-0.6-0.5l0.8-0.1l0.7-0.1l0.7-0.1h0.1
		l0.1,0.1l3.3,2.5l0.2,0.2l2.1-0.3l-0.8-0.6c-0.1-0.1-0.2-0.1-0.3-0.2c-0.1,0-0.2,0-0.3,0l-0.8,0.1l-2.9-2.1
		c-0.1-0.1-0.3-0.2-0.5-0.2c-0.2,0-0.4-0.1-0.5,0l-2.5,0.4c0,0-0.1,0-0.1,0.1s0,0.1-0.1,0.1s0,0.1,0,0.1
		C363.7,194.3,363.7,194.4,363.7,194.4L363.7,194.4z"/>
            <path fill="#24E029" d="M365.5,198.6l1.2-0.2l-4.4-3.3l-1.2,0.2L365.5,198.6z" />
            <path fill="#24E029" d="M370.4,197.2l-0.3-0.2l-3.3-2.5l-0.6,0.1l-0.6,0.1l3,2.2l0.3,0.2l-0.4,0.1l-0.9,0.1l-3.3-2.5l-1.2,0.2
		l4.4,3.3l2.9-0.4c0.1,0,0.2,0,0.2-0.1c0.1-0.1,0.1-0.1,0.1-0.2c0-0.1,0-0.2,0-0.2S370.5,197.2,370.4,197.2L370.4,197.2z"/>
            <path fill="#F8AC25" d="M516.3,162.5L495.9,96c-1.7-5.5-8.6-7.3-12.8-3.3l-49.9,48.4c-4.3,4.2-2.4,11.5,3.5,13.1l70.2,18
		C512.8,173.8,518.1,168.3,516.3,162.5L516.3,162.5z"/>
            <path fill="#FF7146" d="M459.3,160l25.1,6.4l-2.2,8.5l-25.1-6.4L459.3,160z" />
            <path fill="#FFC040" d="M463.7,170.2l12,3.1l-13.7,53.5l-12-3.1L463.7,170.2z" />
            <path fill="#E5AC39" d="M463.7,170.2l12,3.1l-1.1,4.1l-12-3.1L463.7,170.2z" />
            <path fill="#FFFFFF" d="M477.3,142.1c-2.2-0.6-3.6-2.7-3.2-5l5.4-27.2c0.6-3.3,3.9-5.4,7.2-4.6c3.3,0.8,5.2,4.3,4.1,7.5l-8.4,26.5
		C481.8,141.5,479.5,142.7,477.3,142.1z"/>
            <path fill="#FFFFFF" d="M473.9,155.1c2.4,0.6,4.8-0.8,5.4-3.2c0.6-2.4-0.8-4.8-3.2-5.4c-2.4-0.6-4.8,0.8-5.4,3.2
		C470.1,152.1,471.6,154.5,473.9,155.1z"/>

            <image width="19" height="21" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAVCAYAAACkCdXRAAAACXBIWXMAAAsSAAALEgHS3X78AAAA
GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAG1JREFUeNpiZCAB3J65/T8yXzXd
kxGZz8RAAUA3nCLD0A2k2DCqugzZdSz4woBsl1FqENwwahhE1QgAOYiJWq4anEljcBsGyvSD2Jvo
ZRIlgJEa2QnmICZcpSZFLiNUihJyFV7DiDEY3TcAAQYAxOIr++vcHaQAAAAASUVORK5CYII=" transform="matrix(1 0 0 1 456 193.2348)">
            </image>
            <line fill="#29244C" x1="446" y1="231.2" x2="379" y2="231.2" />
          </g>
          <g>
            <path fill="#262154" stroke="#6D5BD0" strokeWidth="8" d="M20.6,223.6h796c8.8,0,16,4.6,16,10.2V587c0,5.6-7.2,10.2-16,10.2h-796
		c-8.8,0-16-4.6-16-10.2V233.8C4.6,228.2,11.8,223.6,20.6,223.6z"/>
            <path fill="#6D5BD0" d="M116.6,214.7c0.7-1.2,2.1-1.9,3.6-1.9h596.2c1.4,0,2.7,0.6,3.4,1.6l4.2,5.8c1.6,2.2-0.3,5.1-3.4,5.1H116.9
		c-2.9,0-4.9-2.5-3.6-4.7L116.6,214.7z"/>
            <path fill="#6D5BD0" d="M558.9,209.1c0.2-1.7,1.9-3,4-3h55.3c2,0,3.7,1.2,4,2.9l0.9,5.8c0.3,2-1.5,3.8-4,3.8h-57
		c-2.4,0-4.2-1.7-4-3.7L558.9,209.1z"/>
            <ellipse fill="#6D5BD0" cx="188.1" cy="214.9" rx="12.5" ry="10.4" />
            <ellipse fill="#6D5BD0" cx="230.1" cy="214.9" rx="12.5" ry="10.4" />
            <path fill="#897DD0" d="M183.6,210.3h9c1.7,0,3,1.1,3,2.5v2.5c0,1.4-1.3,2.5-3,2.5h-9c-1.7,0-3-1.1-3-2.5v-2.5
		C180.6,211.4,182,210.3,183.6,210.3z"/>
            <path fill="#897DD0" d="M225.6,210.3h9c1.7,0,3,1.1,3,2.5v2.5c0,1.4-1.3,2.5-3,2.5h-9c-1.7,0-3-1.1-3-2.5v-2.5
		C222.6,211.4,224,210.3,225.6,210.3z"/>
            <path fill="#897DD0" d="M570.6,210.3h40c2.2,0,4,1.5,4,3.3v0.8c0,1.8-1.8,3.3-4,3.3h-40c-2.2,0-4-1.5-4-3.3v-0.8
		C566.6,211.8,568.4,210.3,570.6,210.3z"/>
            <path fill="none" stroke="#897DD0" d="M360.6,212.8v7.1v7.1" />
            <path fill="#897DD0" d="M398.1,216.9h3c1.9,0,3.5,1.3,3.5,2.9l0,0c0,1.6-1.6,2.9-3.5,2.9h-3c-1.9,0-3.5-1.3-3.5-2.9l0,0
		C394.6,218.2,396.2,216.9,398.1,216.9z"/>
            <path fill="#897DD0" d="M416.1,216.9h3c1.9,0,3.5,1.3,3.5,2.9l0,0c0,1.6-1.6,2.9-3.5,2.9h-3c-1.9,0-3.5-1.3-3.5-2.9l0,0
		C412.6,218.2,414.2,216.9,416.1,216.9z"/>
            <path fill="#897DD0" d="M434.1,216.9h3c1.9,0,3.5,1.3,3.5,2.9l0,0c0,1.6-1.6,2.9-3.5,2.9h-3c-1.9,0-3.5-1.3-3.5-2.9l0,0
		C430.6,218.2,432.2,216.9,434.1,216.9z"/>
            <path fill="none" stroke="#897DD0" d="M474.6,212.8v7.1v7.1" />
            <path fill="#6D5BD0" d="M56.6,594.7h725l-16.9,11.2c-1.5,1-3.6,1.6-5.8,1.6H78.4c-2.2,0-4.4-0.6-5.9-1.7L56.6,594.7z" />
            <path fill="none" stroke="#897DD0" d="M181.6,594.7v6.4v6.4" />
            <path fill="none" stroke="#897DD0" d="M634.6,594.7v6.4v6.4" />
            <path fill="#6D5BD0" d="M205.6,599.8h405l-13.5,11.9c-1.5,1.3-3.9,2.1-6.5,2.1H225.6c-2.6,0-5-0.8-6.5-2.1L205.6,599.8z" />
            <ellipse fill="#897DD0" cx="274.1" cy="605.5" rx="2.5" ry="1.6" />
            <path fill="#312C60" d="M288.1,604.5c-1.3-0.8-0.4-2.2,1.4-2.2h245.3c1.8,0,2.7,1.4,1.4,2.2l-5.1,3.3c-0.9,0.6-2.2,0.9-3.5,0.9
		H296.7c-1.3,0-2.6-0.3-3.5-0.9L288.1,604.5z"/>
            <path fill="#897DD0" d="M295.6,602.3h4v3.8c0,0.7-0.9,1.3-2,1.3l0,0c-1.1,0-2-0.6-2-1.3V602.3z" />
            <path fill="#897DD0" d="M305.6,602.3h4v3.8c0,0.7-0.9,1.3-2,1.3l0,0c-1.1,0-2-0.6-2-1.3V602.3z" />
            <path fill="#897DD0" d="M315.6,602.3h4v3.8c0,0.7-0.9,1.3-2,1.3l0,0c-1.1,0-2-0.6-2-1.3V602.3z" />
            <path fill="#897DD0" d="M325.6,602.3h4v3.8c0,0.7-0.9,1.3-2,1.3l0,0c-1.1,0-2-0.6-2-1.3V602.3z" />
            <path fill="#897DD0" d="M335.6,602.3h4v3.8c0,0.7-0.9,1.3-2,1.3l0,0c-1.1,0-2-0.6-2-1.3V602.3z" />
            <path fill="#897DD0" d="M345.6,602.3h4v3.8c0,0.7-0.9,1.3-2,1.3l0,0c-1.1,0-2-0.6-2-1.3V602.3z" />
            <path fill="#897DD0" d="M355.6,602.3h4v3.8c0,0.7-0.9,1.3-2,1.3l0,0c-1.1,0-2-0.6-2-1.3V602.3z" />
            <path fill="#897DD0" d="M365.6,602.3h4v3.8c0,0.7-0.9,1.3-2,1.3l0,0c-1.1,0-2-0.6-2-1.3V602.3z" />
            <path fill="#897DD0" d="M375.6,602.3h4v3.8c0,0.7-0.9,1.3-2,1.3l0,0c-1.1,0-2-0.6-2-1.3V602.3z" />
            <path fill="#897DD0" d="M385.6,602.3h4v3.8c0,0.7-0.9,1.3-2,1.3l0,0c-1.1,0-2-0.6-2-1.3V602.3z" />
            <path fill="#897DD0" d="M395.6,602.3h4v3.8c0,0.7-0.9,1.3-2,1.3l0,0c-1.1,0-2-0.6-2-1.3V602.3z" />
            <path fill="#897DD0" d="M405.6,602.3h4v3.8c0,0.7-0.9,1.3-2,1.3l0,0c-1.1,0-2-0.6-2-1.3V602.3z" />
            <path fill="#897DD0" d="M415.6,602.3h4v3.8c0,0.7-0.9,1.3-2,1.3l0,0c-1.1,0-2-0.6-2-1.3V602.3z" />
            <path fill="#897DD0" d="M425.6,602.3h4v3.8c0,0.7-0.9,1.3-2,1.3l0,0c-1.1,0-2-0.6-2-1.3V602.3z" />
            <path fill="#897DD0" d="M435.6,602.3h4v3.8c0,0.7-0.9,1.3-2,1.3l0,0c-1.1,0-2-0.6-2-1.3V602.3z" />
            <path fill="#897DD0" d="M445.6,602.3h4v3.8c0,0.7-0.9,1.3-2,1.3l0,0c-1.1,0-2-0.6-2-1.3V602.3z" />
            <path fill="#897DD0" d="M455.6,602.3h4v3.8c0,0.7-0.9,1.3-2,1.3l0,0c-1.1,0-2-0.6-2-1.3V602.3z" />
            <path fill="#897DD0" d="M465.6,602.3h4v3.8c0,0.7-0.9,1.3-2,1.3l0,0c-1.1,0-2-0.6-2-1.3V602.3z" />
            <path fill="#897DD0" d="M475.6,602.3h4v3.8c0,0.7-0.9,1.3-2,1.3l0,0c-1.1,0-2-0.6-2-1.3V602.3z" />
            <path fill="#897DD0" d="M485.6,602.3h4v3.8c0,0.7-0.9,1.3-2,1.3l0,0c-1.1,0-2-0.6-2-1.3V602.3z" />
            <path fill="#897DD0" d="M495.6,602.3h4v3.8c0,0.7-0.9,1.3-2,1.3l0,0c-1.1,0-2-0.6-2-1.3V602.3z" />
            <path fill="#897DD0" d="M505.6,602.3h4v3.8c0,0.7-0.9,1.3-2,1.3l0,0c-1.1,0-2-0.6-2-1.3V602.3z" />
            <path fill="#897DD0" d="M515.6,602.3h4v3.8c0,0.7-0.9,1.3-2,1.3l0,0c-1.1,0-2-0.6-2-1.3V602.3z" />
            <path fill="#897DD0" d="M525.6,602.3h4v3.8c0,0.7-0.9,1.3-2,1.3l0,0c-1.1,0-2-0.6-2-1.3V602.3z" />
            <ellipse fill="#897DD0" cx="550.1" cy="605.5" rx="2.5" ry="1.6" />
          </g>
          <g className='cursor-pointer' onClick={() => setOpenModal(false)}>
            <circle fill="#F37878" cx="829.2" cy="222.7" r="24" />
            <path fill="#FFFFFF" d="M820.6,214.2c0.7-0.7,1.6-1,2.1-0.7l0.1,0.1l15.4,15.4c0.4,0.4,0.1,1.4-0.6,2.2c-0.7,0.7-1.6,1-2.1,0.7
		l-0.1-0.1L820,216.4C819.5,216,819.8,215,820.6,214.2z"/>
            <path fill="#FFFFFF" d="M837.6,214.1c0.7,0.7,1,1.6,0.7,2.1l-0.1,0.1l-15.4,15.4c-0.4,0.4-1.4,0.1-2.2-0.6c-0.7-0.7-1-1.6-0.7-2.1
		l0.1-0.1l15.4-15.4C835.8,213,836.8,213.3,837.6,214.1z"/>
          </g>
          <text transform="matrix(1 0 0 1 354.1922 290.2351)" fill="#FFFFFF" fontSize="24px">HEADS UP!</text>
          <rect x="104.7" y="321.6" fill="none" width="640.7" height="113.3" />
          <text transform="matrix(1 0 0 1 104.6782 334.4558)" fill="#FFFFFF" fontSize="18px">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy </text>
          <text transform="matrix(1 0 0 1 104.6782 356.0555)" fill="#FFFFFF" fontSize="18px">nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi </text>
          <text transform="matrix(1 0 0 1 104.6782 377.656)" fill="#FFFFFF" fontSize="18px">enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis </text>
          <text transform="matrix(1 0 0 1 104.6782 399.2556)" fill="#FFFFFF" fontSize="18px">nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in </text>
          <text transform="matrix(1 0 0 1 104.6782 420.8562)" fill="#FFFFFF" fontSize="18px">hendrerit </text>
          <rect x="105.1" y="434.9" fill="none" width="640.7" height="19.3" />
          <text transform="matrix(1 0 0 1 309.887 447.7892)" fill="#FFFFFF" fontSize="18px">Do you still want to proceed?</text>
          <g className=' cursor-pointer' onClick={() => setOpenModal(false)}>
            <path fill="transparent" stroke="#6D5BD0" strokeWidth="0.75" d="M389.1,528.2H240.7c-4.6,0-8.3-3.7-8.3-8.3v-22c0-4.6,3.7-8.3,8.3-8.3
		h148.4c4.6,0,8.3,3.7,8.3,8.3v22C397.4,524.5,393.7,528.2,389.1,528.2z"/>
            <rect x="271.8" y="502.6" fill="none" width="86.1" height="19.3" />
            <text transform="matrix(1 0 0 1 278.7191 515.4558)" fill="#6D5BD0" fontSize="18px">CANCEL</text>

          </g>
          <g className=' cursor-pointer' onClick={() => alert("AGUY, hindi pa ho ready are.")}>
            <path fill="#6D5BD0" d="M596.6,528.2H448.2c-4.6,0-8.3-3.7-8.3-8.3v-22c0-4.6,3.7-8.3,8.3-8.3h148.4c4.6,0,8.3,3.7,8.3,8.3v22
	C604.9,524.5,601.2,528.2,596.6,528.2z"/>
            <rect x="488.4" y="502.6" fill="none" width="75.3" height="19.3" />
            <text transform="matrix(1 0 0 1 494.5548 515.4558)" fill="#FFFFFF" fontSize="18px">AGREE</text>
          </g>

        </svg>

      </div>
    )
  }
  const SvgMobile = () => {
    return (
      <div>

        <svg version="1.2" baseProfile="tiny" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px" y="0px" viewBox="0 0 492.8 617.5" xmlSpace="preserve">
          <g>
            <path fill="none" stroke="#53AE47" strokeWidth="2" d="M245.3,44.3l22,12.7c2.5,1.4,4,4.1,4,6.9v25.4c0,2.9-1.5,5.5-4,6.9
		l-22,12.7c-2.5,1.4-5.5,1.4-8,0l-22-12.7c-2.5-1.4-4-4.1-4-6.9V63.9c0-2.9,1.5-5.5,4-6.9l22-12.7C239.7,42.9,242.8,42.9,245.3,44.3
		z"/>

            <image width="16" height="70" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAABLCAYAAACfk8wRAAAACXBIWXMAAC4jAAAuIwF4pT92AAAA
GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAMlJREFUeNrsmDsOgCAQRJHLmVjY
e0J7CxNvZ+yIUdjP4CLZTWwsJm9mUJEQfDSzHNN2Xem9iBSHiN4J4aTruM9q0TdKGGlKKRbNUUJI
75Qi0RIltP10Bg3lk/VqpBFZEFuUUpCKNEdpmynHuoi0ZN3OPtc6m5Ri3ca+xLr9s0/N83tSaZ62
mXLybO/NzxbVlGRnn1tSB0W5qIu6qIu6qIu2uueXfJY7Lgr2G6nJ1TbT6ocIKlFprixSagRtbHrN
juVCjSX1nzkFGABMIkbOcoHIxQAAAABJRU5ErkJggg==" transform="matrix(0.24 0 0 0.24 262.92 141.1598)">
            </image>
            <path fill="#2E2554" d="M214.3,167C214.3,167,214.3,167,214.3,167C214.3,167,214.3,167,214.3,167L214.3,167z" />
            <path fill="#2E2554" d="M222.3,165.9c1.1-0.1,2.1-0.2,3.2-0.3l-0.1-0.1l-1.6,0.2L222.3,165.9z" />
            <path fill="#8154A2" d="M232.6,130.4c0,0-11.2,0.4-18.7,8.2c-0.5,0.5-1,1.1-1.5,1.6c0,0-27,32.3-29.9,43.5l3.8,2.8l3.3,2.5
		c9.9-5.9,34-40.3,34-40.3l0.1-0.1l2.1,1.5l9.6-14.7L232.6,130.4z"/>
            <path fill="#572C86" d="M201.9,162.4l8.3-10.9c0.9-1.2,1.4-2.7,1.4-4.2c0-1.5-0.6-3-1.5-4.2c-3.5,4.3-10.4,12.9-16.4,21.4
		c1.4,0.6,3,0.8,4.5,0.4C199.6,164.5,200.9,163.6,201.9,162.4L201.9,162.4z"/>
            <path fill="#572C86" d="M212.4,155l-8.4,10.9c-0.9,1.2-1.4,2.7-1.4,4.2c0,1.5,0.5,3,1.4,4.2c6.3-7.7,12.8-16.3,16.4-21.4
		c-1.4-0.6-3-0.7-4.4-0.3S213.4,153.8,212.4,155L212.4,155z"/>
            <path fill="#8154A2" d="M250,130.7c0,0-13.8-1.7-19.4,0l7.5,8.1L250,130.7z" />
            <path fill="#8154A2" d="M232.6,130.4c0,0-11.2,0.4-18.7,8.2c-0.5,0.5-1,1.1-1.5,1.6c0,0-0.9,1.1-2.3,2.9c1,1.2,1.5,2.7,1.5,4.2
		s-0.5,3-1.4,4.2l-8.3,10.9c-0.9,1.2-2.3,2.1-3.8,2.5c-1.5,0.4-3.1,0.2-4.5-0.4c-5.3,7.5-10.5,16.7-11.6,20.9l4.3,1l2.4,1.6
		c3.6-2.2,9.9-7.2,15.5-13.9c-0.9-1.2-1.4-2.6-1.4-4.2c0-1.5,0.5-3,1.4-4.2l8.4-10.9c0.9-1.2,2.2-2.1,3.7-2.5c1.5-0.4,3-0.3,4.4,0.3
		c1.9-2.6,3-4.2,3-4.2l0.1-0.1l2.1,1.5l9.6-14.7L232.6,130.4z"/>
            <path fill="#2E2554" d="M229.8,130.7c-3.8,0.6-10.7,2.5-16,7.9c-0.5,0.5-1,1.1-1.5,1.6l-0.1,0.1c1.7,1,3.7,1.5,5.7,1.5
		c2,0,4-0.5,5.8-1.5c1.8-1,3.2-2.4,4.3-4.1C229.1,134.7,229.7,132.7,229.8,130.7L229.8,130.7z"/>
            <path fill="#8154A2" d="M247.2,130.4c0.9,0.1,1.9,0.2,2.8,0.3c0.1,2,0.7,3.9,1.8,5.6c1.1,1.7,2.5,3.1,4.3,4.1
		c1.8,1,3.7,1.5,5.7,1.4c2,0,4-0.5,5.7-1.5c1.9,2.3,27,32.6,29.8,43.4l-3.8,2.8l-3.3,2.5c-9.9-5.9-34-40.3-34-40.3l-0.1-0.1
		l-2.1,1.6l-9.6-14.7L247.2,130.4z"/>
            <path fill="#572C86" d="M277.9,162.4l-8.4-10.9c-0.9-1.2-1.4-2.7-1.4-4.2s0.6-3,1.5-4.2c3.5,4.3,10.4,12.9,16.4,21.4
		c-1.4,0.6-3,0.8-4.5,0.4C280.2,164.5,278.9,163.6,277.9,162.4z"/>
            <path fill="#572C86" d="M267.4,155l8.4,10.9c0.9,1.2,1.4,2.7,1.4,4.2c0,1.5-0.5,3-1.5,4.2c-6.4-7.7-12.8-16.3-16.4-21.4
		c1.4-0.6,2.9-0.7,4.4-0.3C265.2,153,266.4,153.8,267.4,155L267.4,155z"/>
            <path fill="#2E2554" d="M250,130.7c3.8,0.6,10.7,2.5,16,7.9c0.5,0.5,1,1.1,1.5,1.6l0.1,0.1c-1.7,1-3.7,1.5-5.7,1.5
		c-2,0-4-0.5-5.8-1.5c-1.8-1-3.2-2.4-4.3-4.1C250.7,134.7,250.1,132.7,250,130.7L250,130.7z"/>
            <path fill="#8154A2" d="M250.4,145.9h-20.2v-15.2l17.4-0.3L250.4,145.9z" />
            <path fill="#2E2554" d="M233.3,119.9v11.8c0,2.3,2.9,4.1,6.5,4.1c3.6,0,6.5-1.9,6.5-4.1v-11.8H233.3z" />
            <path fill="#8154A2" d="M251.7,175.9c-0.1-3.7,1-7.4,2.9-10.5c-6.5-0.6-13.5-1-19.7-1c-3.5,0-6.4,0.1-8.9,0.3l0,0.1l-0.9,0.1
		l0.1,0.1c1.9,3.3,2.9,7.1,2.9,10.9c-1.2,0.1-2.3,0.3-3.4,0.6c5-0.9,10.1-1.3,15.2-1.3C243.9,175.2,247.8,175.4,251.7,175.9
		L251.7,175.9z"/>
            <path fill="#2E2554" d="M226.2,164.5c-1,0.1-1.9,0.1-2.9,0.2l-6.9,1.3c0,0-0.3,1-0.2,1c-0.7,3.5-1.3,7.7-1.8,12.5
		c0.4-0.2,4.4-2.3,11.8-3.6c1-0.2,2.1-0.4,3.1-0.5C229.2,171.5,228.1,167.8,226.2,164.5L226.2,164.5z"/>
            <path fill="#2E2554" d="M264.1,167c-3.6-0.7-7.3-1.2-11-1.6c-1.8,2.8-2.7,6.1-2.6,9.5h0.2c1.9,0.2,3.7,0.5,5.5,0.9
		c3.3,0.6,6.5,1.7,9.6,3C265.4,174.3,264.8,170.3,264.1,167z"/>

            <image width="224" height="88" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAABcCAYAAACY59LRAAAACXBIWXMAAC4jAAAuIwF4pT92AAAA
GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAYhJREFUeNrs3MEJwkAURVH/YEep
yTokdViTNSlZBERQVBJfdM7ZKAouJlyeQnC3A4CelSPYpvPxdFny84bx4FqLUDj/RNQiFJdYRSgy
hCpCsYlThGJDnCIUHT8fZokOYYpQdHQdZQkPQYpQdHQdZQkPskGW8CAbZIkOskGW8CAbZIkPskGW
8CAbZAkPskGW8CAb4158kFXCg+waNscD63s2bCKEcIgihDARQngNRQiWEPpew/bqj0fAEoIIARGC
CAERgggBEYIIARGCCIHP3N6Z1h69AVhCECEgQhAhIEIQISBCECEgQhAhsJz5DrV2/wJgCUGEgAhB
hIAIQYSACEGEgAhBhMA6pjvVRAhhNdfoKOD7hvFQbX7iOCC4hO98f3VksOwSLr6AQoVwhEKFH4hQ
pLDxCIWKCP+EUBGhSEGEQkWEQgURihQRIlREKFREiEgRIUIVIUJFhIhUhAgVESLUrQQ4PYoQkYoQ
+gxVhAhVhNB3qCKEcKQihHCoIoRwqP50GwAmVwEGAOr62YHMDsy6AAAAAElFTkSuQmCC" transform="matrix(0.24 0 0 0.24 213.24 174.9998)">
            </image>
            <path fill="#CE7E9B" d="M229.3,175.4c0,0-11.1,1.6-14.9,4.2l-0.1,1.2l-0.4,4.4c0,0,7.4,6.2,21.6,5.9
		C235.4,191.1,226.9,185.1,229.3,175.4z"/>

            <image width="91" height="67" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABHCAYAAAD4MUK2AAAACXBIWXMAAC4jAAAuIwF4pT92AAAA
GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAVNJREFUeNrs3VsOgjAQheEOYXuu
1gWW+GqIkVDmzOU/GwDP16k+SBmDEEJkMc+LzTlfpzdh9gZACPDzBovjhAeojmLeF1yFUAWlDEBW
lNIAGUBaAUQEaQ0QAQQAMQYAYgxTfKCMCE9hACDGAECMAYAYAwAxBABiCADEENsg0oUHgDgAdAPo
uv8zAQCQsx0AACYAAAIAAPwEZQIAIAAAwP7PBABAHHeDzfuChAkAgDgCsP0wAX0BWP1MQF8AVj8T
kCLG6ncu/OvviUyAsPxHJoDV/1/xjwBQ/rXyP9mpSFP88glg9V8rngkQF790Ajqv/ruPqhrla4pf
AtCx/NVPyvMdICr+9gTwrK8QgCfdhQCVyw9/YBOHbAgBKpUf6fA+61J+1CMsrXL56c8NzVZ+xtNz
LXP5Fc6QtizlVz1F3aKV3+1dAuZdfueXNZxlp0zSOocAAwDPuLTdW90j0AAAAABJRU5ErkJggg==" transform="matrix(0.24 0 0 0.24 244.68 175.2398)">
            </image>
            <path fill="#29254C" d="M273,203.4c0.1-0.2,0.1-0.4,0.2-0.6c0-0.1,0-0.1,0.1-0.2l0.1-0.4l0-0.2c1-4.4-0.3-9.1-2-12.9
		c-1.9-4.3-5.2-7.4-5.2-7.4c-8.9,0.7-17.1,1.1-26.3,1.1h-0.2c-2.3,0-18.6,0.2-25.6-1.2c0,0-2.9,3.1-5.2,7.4c-2.2,4.2-4,9.5-2.6,14.3
		"/>

            <image width="393" height="446" xlinkHref="data:image/png;base64,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" transform="matrix(0.24 0 0 0.24 190.92 18.9998)">
            </image>
            <path fill="#FFFFFF" d="M274.7,77.9c0,6.8-6,12.3-13.3,12.3c-7.4,0-13.3-5.5-13.3-12.3c0-6.8,6-12.2,13.3-12.2
		C268.8,65.7,274.7,71.1,274.7,77.9z"/>
            <path fill="#2E2554" d="M271.8,77.6c0,7-4.8,12.6-10.7,12.6c-5.9,0-10.7-5.6-10.7-12.6c0-7,4.8-12.6,10.7-12.6
		C267,65.1,271.8,70.7,271.8,77.6z"/>
            <path fill="#2E2554" d="M261.4,62c-7.4,0-14,6.2-16,13.3l2.8,0.7c0.8-2.7,2.4-5.2,4.6-7s4.9-2.8,7.8-3c2.8-0.2,5.7,0.5,8.1,2
		c2.4,1.5,4.3,3.7,5.4,6.3l4.9-3.8C276.4,64.5,268.1,62,261.4,62z"/>
            <path fill="#2E2554" d="M273.7,53.2c-0.2-0.2-0.4-0.4-0.6-0.6l-0.6-0.5c-0.2-0.2-0.4-0.3-0.6-0.5l-0.3-0.2l-0.3-0.2
		c-0.2-0.1-0.4-0.3-0.7-0.4c-0.2-0.1-0.6-0.3-0.9-0.5c-3.9-2.2-8.8-2.1-11.8-1.8c-1,0.1-1.9,0.2-2.8,0.4h0c-2.4,0.5-4.6,1.7-6.3,3.4
		l0,0l-0.1,0.1c-0.6,0.6-1.1,1.2-1.5,2l-0.2,0.2l0.2,0.2c0.1,0.1,0.2,0.1,0.2,0.2l0.3,0.2c0.1,0.1,0.2,0.1,0.3,0.2l0.3,0.2
		c0.1,0.1,0.2,0.1,0.3,0.1l0.3,0.1c0.1,0,0.2,0.1,0.3,0.1l0.3,0.1c0.1,0,0.2,0,0.4,0.1l0.4,0c0.1,0,0.2,0,0.4,0c0.2,0,0.5,0,0.7-0.1
		c0.2,0,0.5-0.1,0.7-0.1l0.2,0l0.3-0.2c0.1-0.1,0.4-0.3,0.5-0.4l0.6-0.4c0.4-0.3,0.8-0.5,1.2-0.8c0.4-0.2,0.8-0.5,1.3-0.7l0.7-0.3
		l0.7-0.3c0.4-0.2,0.9-0.4,1.3-0.6c0.4-0.2,0.9-0.3,1.4-0.5c0.2-0.1,0.5-0.1,0.7-0.2c0.2-0.1,0.5-0.1,0.7-0.2c0.2,0,0.5-0.1,0.7-0.1
		L263,51c0.5,0,1-0.1,1.4-0.1c0.2,0,0.5,0,0.7,0c0.2,0,0.5,0,0.7,0c0.2,0,0.5,0,0.7,0.1l0.7,0.1c0.2,0,0.5,0.1,0.7,0.2l0.3,0.1
		l0.3,0.1c0.5,0.1,0.9,0.3,1.3,0.5c0.2,0.1,0.4,0.2,0.6,0.3l0.3,0.2l0.3,0.2c0.2,0.1,0.4,0.3,0.6,0.4l0.6,0.4
		c0.2,0.1,0.4,0.3,0.6,0.5l0.5,0.5l0.7-0.7L273.7,53.2z"/>
            <path fill="#2E2554" d="M198.6,47.3c0.2-0.1,0.3-0.3,0.5-0.4l0.9-0.7l0.8-0.5l0.4-0.2l0.4-0.2c0.3-0.1,0.6-0.3,0.8-0.4
		c0.2-0.1,0.8-0.3,1.1-0.4c4.7-1.9,10.2-1.1,13.6-0.3c1.1,0.2,2.1,0.5,3.1,0.9c2.6,1,4.9,2.6,6.6,4.8l0,0L227,50
		c0.6,0.7,1.1,1.6,1.4,2.4l0.2,0.3l-0.3,0.1c-0.1,0.1-0.2,0.1-0.3,0.2l-0.4,0.2c-0.1,0.1-0.2,0.1-0.4,0.2l-0.4,0.1
		c-0.1,0-0.3,0.1-0.4,0.1l-0.4,0.1c-0.1,0-0.3,0.1-0.4,0.1l-0.4,0c-0.1,0-0.3,0-0.4,0h-0.4c-0.1,0-0.3,0-0.4,0
		c-0.3,0-0.5-0.1-0.8-0.2l-0.8-0.3l-0.2-0.1l-0.3-0.2c-0.1-0.2-0.4-0.4-0.6-0.5c-0.2-0.2-0.4-0.4-0.6-0.6c-0.4-0.4-0.8-0.7-1.3-1.1
		c-0.4-0.3-0.9-0.7-1.3-1l-0.7-0.5L217,49c-0.5-0.3-0.9-0.6-1.4-0.8c-0.5-0.2-1-0.5-1.5-0.7c-0.3-0.1-0.5-0.2-0.8-0.3
		c-0.3-0.1-0.5-0.2-0.8-0.3c-0.3-0.1-0.5-0.2-0.8-0.3l-0.8-0.2c-0.5-0.1-1.1-0.3-1.6-0.3c-0.3-0.1-0.6-0.1-0.9-0.1
		c-0.2,0-0.4,0-0.6,0H207h-0.8c-0.3,0-0.5,0.1-0.8,0.1c-0.1,0-0.3,0-0.4,0l-0.4,0.1c-0.5,0.1-1.1,0.2-1.6,0.4
		c-0.3,0.1-0.5,0.2-0.8,0.3l-0.4,0.1l-0.4,0.2c-0.2,0.1-0.5,0.2-0.7,0.4l-0.6,0.3c-0.2,0.1-0.6,0.4-0.8,0.5l-0.7,0.5l-0.7-0.9
		L198.6,47.3z"/>
            <path fill="#FFFFFF" d="M199,77.9c0,6.8,6,12.3,13.3,12.3c7.4,0,13.3-5.5,13.3-12.3c0-6.8-6-12.2-13.3-12.2
		C205,65.7,199,71.1,199,77.9z"/>
            <path fill="#2E2554" d="M202,77.6c0,7,4.8,12.6,10.7,12.6c5.9,0,10.7-5.6,10.7-12.6c0-7-4.8-12.6-10.7-12.6
		C206.7,65.1,202,70.7,202,77.6z"/>
            <path fill="#2E2554" d="M212.3,62c7.4,0,14,6.2,16,13.3l-2.8,0.7c-0.8-2.7-2.4-5.2-4.6-7s-4.9-2.8-7.8-3c-2.8-0.2-5.7,0.5-8.1,2
		c-2.4,1.5-4.3,3.7-5.4,6.3l-4.9-3.8C197.3,64.5,205.6,62,212.3,62z"/>
            <path fill="none" stroke="#2E2554" strokeWidth="1.83" strokeLinecap="round" strokeMiterlimit="10" d="M249.7,109.6
		c0,0-9.9-4.5-20.7,0"/>
            <path fill="#FFFFFF" d="M236.7,97.6l-3.4-2.8c1.9-2.6,2.8-5.8,2.5-9C235.9,85.7,238.3,93.9,236.7,97.6z" />

            <image width="589" height="532" xlinkHref="data:image/png;base64,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
/yHAAJhqAx/fI+8HAAAAAElFTkSuQmCC" transform="matrix(0.24 0 0 0.24 166.92 -0.2002)">
            </image>
            <path fill="#6A3594" d="M196.3,95.9c0,0,1.3,16.7,11.6,30.7c0,0,18.5,1.7,25.4,0.4v-2.1C233.3,124.9,203.5,119.6,196.3,95.9z" />
            <path fill="#6A3594" d="M279.4,94.1c0,0-0.9,28.4-6.7,33.5c0,0-23.3,0.7-27.5-0.5v-2.7C245.3,124.3,274.1,118.9,279.4,94.1z" />

            <image width="89" height="126" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAACBCAYAAAA/gL8fAAAACXBIWXMAAC4jAAAuIwF4pT92AAAA
GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAfhJREFUeNrs28FRA0EQQ1H3FhkR
E3FQxEFMxATFHVM22FbP9NOZC/+3ZnXx6STR1A7/xMfr++clf/f89lIEPAD0NUlLqYnQOwkp0LMi
CvisiAI/K6KAz0oo8LMiCvishAI/K6HAz0oo8LMSCvyshAI/K6HAz0o4ThI9usP1Z1PgZ58iT1D4
BThcfzYaEG7B4fo1YHQLCNCA2S04HlU10QACPEMEaIAQQIDvwI0FmKAaQIAQQIAQQIA8WIAJqgEE
CAEECAEEyIMFmKAaQIAQsEx++s0AARpAgKwowATVgOU/wARogBBAwNz3n4BVG2CCeoK2eH4I0IDZ
10+ABggBwefnTwJMUA3Y5voJ0IDZ10+ABsy+/qsFWEAasNX1E6ABs6+fAA2Yff0ENMjF9kzQ21+/
BoThE+AjPPv6CQjDJ2CVFWQB3ef6NSAMnwAraPb1ExCGT0AY/kUCLCDfgG2vn4AwfALC8AnwDZh9
/QSE4X+nTNAcfA0IwyfAR3j29Y8W0AH+WAFd4P+6gnZdQJ3gj2tAN/ijBHSEP0ZAV/gjBHSGv72A
7vDPrqDVF9AK4LdtwErwtxOwGvzvPAGvAWPhL92A1cGfXUHdF9Au4JdrwG7glxGwK/j2AnYH31LA
FOitBEyEHhcwHfrZGXqPCQr2HRsAroj8L18CDADYYcWcQvfnkgAAAABJRU5ErkJggg==" transform="matrix(0.24 0 0 0.24 279.72 63.6398)">
            </image>
            <path fill="#2E2554" d="M293.5,69.3c-5.7,1.1-9.3,13.5-9.4,14l1.3,0.4c0.8-2.7,1.8-5.3,3.2-7.7c0.4,0,0.8,0.2,1.2,0.3
		c0.4,0.2,0.7,0.5,0.9,0.8c0.8,1.1,1.5,3.4,0,8.6l1.3,0.4c1.4-4.6,1.3-7.9-0.2-9.8c-0.6-0.8-1.5-1.3-2.4-1.5
		c1.3-2.1,2.8-3.8,4.5-4.1c1.5-0.3,3,0.5,4.5,2.5l1.1-0.8C297.4,69.9,295.5,68.9,293.5,69.3z"/>
            <path fill="#5BBA47" d="M300.5,67.9c-0.5,0.9-2.1,3.5-3.8,4.6l1.8,2.7c2.7-1.8,4.7-5.6,4.8-5.8L300.5,67.9z" />
            <path fill="#5BBA47" d="M286.8,90c-0.1,0.3-0.4,0.6-0.7,0.7c-0.3,0.2-0.6,0.3-1,0.3c-0.3,0-0.7-0.1-0.9-0.3
		c-0.3-0.2-0.5-0.5-0.6-0.8c-0.1-0.3-0.1-0.7-0.1-1c0.1-0.3,0.3-0.6,0.5-0.9c0.2-0.2,0.6-0.4,0.9-0.4c0.3-0.1,0.7,0,1,0.1
		c0.2,0.1,0.4,0.2,0.5,0.4c0.2,0.2,0.3,0.4,0.4,0.6c0.1,0.2,0.1,0.4,0.1,0.7C286.9,89.5,286.9,89.8,286.8,90L286.8,90z"/>
            <path fill="#2E2554" d="M289.9,89.5c-0.1,0.2-0.2,0.4-0.4,0.5c-0.2,0.1-0.4,0.2-0.6,0.2c-0.2,0-0.4-0.1-0.6-0.2
		c-0.2-0.1-0.3-0.3-0.4-0.5c-0.1-0.2-0.1-0.4,0-0.6c0-0.2,0.2-0.4,0.3-0.5c0.2-0.1,0.3-0.2,0.6-0.3c0.2,0,0.4,0,0.6,0.1
		c0.3,0.1,0.5,0.3,0.6,0.6C290.1,89,290.1,89.3,289.9,89.5L289.9,89.5z"/>

            <image width="130" height="118" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIUAAAB5CAYAAAAXiuJeAAAACXBIWXMAAC4jAAAuIwF4pT92AAAA
GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAjVJREFUeNrs3UFOwzAQBdAE9Uac
iXMgztEzcSZYUkEEKnXsP/b7uy6TefnjRhVsm8i37Lcf3l+vH7efn99edrdocRRHMCCB4lcUoEDx
UGCBAhYoYIEiINAMRJEMAxwo4IECqhE5mjUU8gP8fo8gWaP1Lm4LBFBAsEEBQZtvH84Va38T0hQQ
QAHBg+vDClkDgaaAAAoITlgfVsj8CDQFBG2aQlvMC0BTQAAFBCevj9lXiF9jaQoIWjVF1bYAQFNA
0LspEtsCgrZ5cgukSVNoC00hmkJbaAqRlig8mdZHiTUCqvUhqU2hLTSFQUBRL34lFoRCWzhTxD+p
kFof1kgyCk+o9WGNaArRFNpCUxiGdBtYQmMAGnamMBAoIuO9Rdj6sEY0hYFoinqNAWfgmcJQNEVk
Y4AZigIM68NgoMiPdxeh68Ma0RQGoynqNAaUwSjAsD4MR1Pkt8bqIMtcPBjWhyFpiszG8Le5wQCj
MgownCkMSlNkNsZKCKe50B44VoEx1UWCAQUYDpoGpinCW2NmfNM/VWBAAQYUGThmg7HcoQwMKMCA
YiwOKMCYFoYXPSfgqA4DCjCg6ImjKgwowIBiBI5qMKAAA4qROKrAgKIzjgowoAADCjigiMeRCAMK
MKBIxZEEA4ogHCkwoAjDkQADCjigAAOK8jhGwIACDigq4+gFAwo4oJgFx5kwoIADihmBtIYBBRxQ
wAEFHFDIEZB7cUABBxSA/I0DCjhEvoD4R70i8v98CjAA71h5rqUwv/UAAAAASUVORK5CYII=" transform="matrix(0.24 0 0 0.24 195.72 94.5998)">
            </image>

            <image width="46" height="42" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAuCAYAAABqK0pRAAAACXBIWXMAAC4jAAAuIwF4pT92AAAA
GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAANNJREFUeNrsmcsNgDAMQ2nERszE
HIg5mImZQBy4ID5tiFS7SY5IoLrPaYzadVFYle4ertOy1VrQMI9J856g7ax2E5P1B2uRkaZ7hJGK
DyJMVPwQYaHSDBGx9Cm8EIZpL5Y+DSIGVIqEIFPxNUcY/ld8zZFmrYVor7AW2lEcRNCmfBBB6xNa
Ild7ibVX6YggiVALQROhiihoIs4DR9hJ+E2/yDQOewm7iGxrMYj4FMIi4rVHUEU85TuoW90/IbRn
WWixtbQ0akf6lCuC4WohCql2AQYAYNVdrsTYZHwAAAAASUVORK5CYII=" transform="matrix(0.24 0 0 0.24 272.52 41.7998)">
            </image>

            <image width="115" height="120" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHUAAAB5CAYAAAAHxm7HAAAACXBIWXMAAC4jAAAuIwF4pT92AAAA
GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAi1JREFUeNrs2ktuE1EQQNEEZUes
iXUg1sGaWBOMIlkoJDh2u1/dd2rksY9uVfvz9GRy8+wtaMyv7z9/v75+8XY0IC8HagARahTSTY0h
Xs7XH9+elToc0fqNIkKNAbqpQcC/76lSh+J9NF8wtUChRgdqZF7vKVSlGqjmlNULVakGqjll9UK9
YqZ88QDV+jUTVi9UpZoJlUJVqpky/vkw8OPMe6tXqdavmVApVKUaD0oekk5ZvUq1fs2ESqG6qe7p
hEqV6qaaCZVCdVPd0wmVKtVNNRMqtX4XXb23gCrV+jUTKoW66FMvVJVCrYNCDa5eqMFKoUbHlw8n
r957V6rU2NqFGnxAghqt1E09qdIjQZUaKxSqjzRW75RKlRoE3brUR1b6SFCluqkqnVCpUoOgW5b6
qErPAlVqEHS7Uh9R6dmgW5Va+yUG6iZrd6v1u8vaVWoUdItSj650NdA86o6g1m8QNF3qkZWuDJpF
3RnU+g2CJks9qtIpoDlUoDFUoG5qFjRT6hGVTgVNoAKNoQJ9e15czg7m+FLvWWkJdCwq0Bgq0Bgq
0BjqvUDLmKNQgcZQgcZQ7wG6E+byqEBjqEBjqLeC7oy5JCrQGOotoDAXRAUaQ/0sKMxFUYGGUGHG
UD8DCnNhVKAx1GtBYS6MCjOGeg0ozMVR1RlDVWcM9X9BYQ5AhRlChRlD/QgU5CBUmDHU90BhDkOF
GUL9FybIgagwQ6hvYYIcjHoJCnL2/BFgAOO0NPE1aw5nAAAAAElFTkSuQmCC" transform="matrix(0.24 0 0 0.24 252.36 93.6398)">
            </image>

            <image width="416" height="190" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAaUAAADACAYAAACknHzzAAAACXBIWXMAAC4jAAAuIwF4pT92AAAA
GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABAdJREFUeNrs3N1q4zAQgNGM0Ov5
af2AKrkoNKbkx1GckXzOzcKypI7q0WdlSy8XAAAAboUlAOCTWmvLwxhFrNc/q+UCoHdk9hIlAJFZ
slyLKAEITBr12Tfz+3kfAALz9ZPSu4sjaoC40C1K3/6miBogLqI03c0gbiAsVkGUprwhBQ5EBVGa
djhEDvOCKHGaoRU9RARR4vSbjBiKBogSNk9gOMUSACBKACBKAAwRJf8hDYCTEgCIEgCiBACiBIAo
AYAoASBKACBKAIgSAIgSAKIEAKIEgCgBgCgBIEoAIEoAiBIAiBIAiBIASUTEKkoAOCkBgCgBIEoA
IEoAjB+lvz8FAQBOSgCIEgCIEgCIEgCiBACiBIAoAYAoASBKACBKAIgSAIgSAKIEAKIEgCgBgCgB
IEoAIEoAiBIAiBIAiBIAogQAogSAKAGAKAEwS5QiYrU0ADgpASBKACBKACBKAIgSAIgSAKIEAKIE
gCgBgCgBMJrtbxASJQCclABAlAAQJQAQJQBECQBECQBRAgBRAkCUAECUABAlABAlAEQJANJEafvr
xAHASQkAUQIAUQJAlABAlABAlAAQJQAQJQBECQBECQBRAgBRAkCUAECUABAlABAlAEQJAEQJAFEC
AFECQJQAQJQAQJQAECUAuK9aAnhfRKzbv2utLVYGXpylR//AYMHjAD3LPMH9eRIlOCBG5gqemykf
38FBIfrvdcUJbvlBBzg4SNuvccTXAVGCgWN0dCiECUQJUsXBqQlECdKdVoQJUQJBWl0PiBIIgDCB
KMEIG78wIUogSK4TRAls9CBKIEiuGUQJECYQJWzsrh9ECWzogCiBuIIogY0cECUQWRAlsIEDogRi
C6IENm5AlADRRZQAQJTAKQJEyWCD+IKTEtioQZQAEQZRAgBRwqkBECVAjEGUABAlcFrw/kGUABAl
ABAlzs1HV9YBUQIAUQKnA+uBKAGAKAEw/2lelJj25rYu1gUnJQDY/cAkSuC0BGnuSVHCpgukmddi
8AHI8gBZer8g4DQJe+/BePXFW2uLJcZmOxZzyygzWmwEAGR5aIy9X9CTF05JTkvQez6LTQGAXjF6
tw3R40I8geGk5LSEeeyhZLsgcL/BeeexZL0wAHLH6BP7fnziYn1EgJNSXuaTzPMXbn4MhChBltkL
Q4DBECbIMm/1yDdmEADE6OsnJU9pOCU5KWG+0kbJYCBKwoSZShclw4EgmTvMUrooGRREybxhfq5q
5sUzMADneoiLUS5UoAwY5or5ZyQMEwZOmKyCeciizvKNMViAADkpefrDUJoV3OeiZPgMK2bDvTyf
6qYwkIDoOCl5gsSQu9fdh4iSQbYZcKb72n0kSgiYDQQQJYETEGBsPwIMALTlNqlyLteaAAAAAElF
TkSuQmCC" transform="matrix(0.24 0 0 0.24 187.56 51.8798)">
            </image>
            <path fill="none" stroke="#693594" strokeWidth="3.38" strokeLinecap="round" strokeMiterlimit="10" d="M231,86.5
		c2-6.1,5.3-7.1,7.1-7.1c1.8,0,5.1,0.9,7.2,7"/>
            <path fill="#572C86" d="M236.8,58.7c-27,0-49.1-2-49.5-2c-0.8-0.1-1.5-0.5-2-1.1c-0.5-0.6-0.7-1.4-0.6-2.1c0.1-0.8,0.4-1.5,1-2
		c0.6-0.5,1.3-0.8,2.1-0.7c0.6,0.1,56.8,5,99-1c0.4-0.1,0.8-0.1,1.2,0c0.4,0.1,0.8,0.2,1.1,0.5c0.3,0.2,0.6,0.5,0.9,0.9
		c0.2,0.4,0.4,0.8,0.4,1.2c0.1,0.4,0,0.8-0.1,1.2c-0.1,0.4-0.3,0.8-0.6,1.1c-0.3,0.3-0.6,0.6-1,0.8s-0.8,0.3-1.2,0.3
		C271.4,58,253.2,58.7,236.8,58.7z"/>
            <path fill="none" stroke="#5BBA47" strokeWidth="3.05" strokeLinecap="round" strokeMiterlimit="10" d="M224.9,144.1
		c0,0-1.8-8.2,0-12.9"/>
            <path fill="none" stroke="#5BBA47" strokeWidth="3.05" strokeLinecap="round" strokeMiterlimit="10" d="M254.3,144.1
		c0,0,1.8-8.2,0-12.9"/>
            <path fill="#5BBA47" d="M255.3,162.4l2.9-6.2L255.3,162.4L255.3,162.4z" />
            <path fill="#5BBA47" d="M264.1,167.4l-0.1-0.6h0L264.1,167.4z" />
            <path fill="#5BBA47" d="M263.9,166.2l0,0.2L263.9,166.2z" />
            <path fill="#5BBA47" d="M263.5,166.5c0,0,0-0.1,0-0.1l-0.1-0.3l0-0.2c-0.1-0.3-0.1-0.6-0.2-0.8V165c-0.3-1.7-0.7-3.2-1-4.6l-3.6-12
		l-0.1-0.2c-1-2.4-2.5-8.4-7.5-8.4h-23.4c-6.2,0-8.5,12.8-8.5,12.9l-1.5,4.8l-2,9.1c3.7-0.8,7.4-1.3,11.2-1.7
		c2.3-0.2,4.9-0.3,8.1-0.3c5.6,0,11.9,0.3,17.7,0.9l11,1.6L263.5,166.5z"/>
            <path fill="#FFFFFF" d="M247,151.9h-0.4l-0.4,0.9l-0.2,0.1h-7.8l-0.3,0.3l-0.3,0.7h7.9l-1.1,1l-0.9,0.9l-0.9,0.9l-0.2,0.2H234
		l-2.8,2h1.9c0,0,0.4,0.2,0.6,0.1c0.2-0.1,0.4-0.2,0.5-0.4l1.1-1.7h6.9c0.7,0,1.3-0.3,1.8-0.7l3.3-3.3c0.1-0.1,0.1-0.2,0.2-0.3
		s0-0.2,0-0.3c0-0.1-0.1-0.2-0.2-0.3C247.3,151.9,247.1,151.9,247,151.9L247,151.9z"/>
            <path fill="#FFFFFF" d="M239.6,147.9l-1.7,2h10.5l1.7-2H239.6z" />
            <path fill="#FFFFFF" d="M233.7,155.9h8.6l0.9-1l0.8-1h-7.9l0.6-0.6l1.4-1.4h7.8l1.7-2H237l-3.9,4.5c-0.1,0.1-0.2,0.2-0.2,0.4
		c0,0.2,0,0.3,0,0.5c0.1,0.1,0.2,0.3,0.3,0.4c0.1,0.1,0.3,0.1,0.4,0.1V155.9z"/>
            <path fill="#229F48" d="M220.7,149.1c0,0-0.5,11.6,5.9,16.3l-10.4,1.6C216.2,167,218.9,152.9,220.7,149.1z" />
            <path fill="#96CE93" d="M259.1,148.7c0,0,0.2,14.3-5.9,17.1l11,1.6C264.2,167.4,261.4,153.1,259.1,148.7z" />
            <path fill="#5BBA47" d="M197.2,164.4l-4.4,5.2l9,7.6l4.4-5.2L197.2,164.4z" />
            <path fill="#64686C" d="M182,176.4l7.4,5.4c0.4,0.3,1,0.4,1.5,0.4c0.5,0,1-0.3,1.4-0.6l16.8-17.2c0.2-0.2,0.3-0.4,0.4-0.6
		c0.1-0.2,0.1-0.5,0.1-0.7c0-0.2-0.1-0.5-0.2-0.7c-0.1-0.2-0.3-0.4-0.5-0.5l-7.4-5.4"/>
            <path fill="#A8AAAD" d="M208,163.7c0.2-0.2,0.3-0.4,0.4-0.6c0.1-0.2,0.1-0.5,0.1-0.7c0-0.2-0.1-0.5-0.2-0.7
		c-0.1-0.2-0.3-0.4-0.5-0.5l-7.4-5.4c-0.4-0.3-1-0.4-1.5-0.4c-0.5,0-1,0.3-1.4,0.6l-16.8,17.2c-0.2,0.2-0.3,0.4-0.4,0.6
		c-0.1,0.2-0.1,0.5-0.1,0.7c0,0.2,0.1,0.5,0.2,0.7c0.1,0.2,0.3,0.4,0.5,0.5l7.4,5.4c0.4,0.3,1,0.4,1.5,0.4c0.5,0,1-0.3,1.4-0.6
		L208,163.7z"/>
            <path fill="#2E2554" d="M192.9,178.5l-9.7-7.1l12.7-13l9.7,7.1L192.9,178.5z" />
            <path fill="#5BBA47" d="M203.5,160.4c-0.2,0.2-0.4,0.3-0.6,0.3s-0.5,0-0.7-0.2c-0.1-0.1-0.2-0.1-0.2-0.2c-0.1-0.1-0.1-0.2-0.1-0.3
		c0-0.1,0-0.2,0-0.3c0-0.1,0.1-0.2,0.2-0.3c0.2-0.2,0.4-0.3,0.6-0.3c0.2,0,0.5,0,0.7,0.2c0.1,0.1,0.2,0.1,0.2,0.2
		c0.1,0.1,0.1,0.2,0.1,0.3c0,0.1,0,0.2,0,0.3C203.6,160.2,203.6,160.3,203.5,160.4L203.5,160.4z"/>
            <path fill="#8355A3" d="M191,167l0.2,0.8h0.3h0.1l0.1-0.6l3.2,2.6h0.3h0.2l-3-2.2l-0.6-0.5l0.8-0.1l0.7-0.1l0.7-0.1h0.1l0.1,0.1
		l3.3,2.5l0.2,0.2l2.1-0.3l-0.8-0.6c-0.1-0.1-0.2-0.1-0.3-0.2c-0.1,0-0.2,0-0.4,0l-0.8,0.1l-2.9-2.1c-0.1-0.1-0.3-0.2-0.5-0.2
		c-0.2,0-0.4-0.1-0.5,0l-2.5,0.4c0,0-0.1,0-0.1,0.1s0,0.1-0.1,0.1c0,0,0,0.1,0,0.1C191,167,191,167,191,167L191,167z"/>
            <path fill="#5BBA47" d="M192.8,171.2l1.2-0.2l-4.4-3.3l-1.2,0.2L192.8,171.2z" />
            <path fill="#5BBA47" d="M197.7,169.8l-0.3-0.2l-3.3-2.5l-0.6,0.1l-0.6,0.1l3,2.2l0.3,0.2l-0.4,0.1l-0.9,0.1l-3.3-2.5l-1.2,0.2
		l4.4,3.3l2.9-0.4c0.1,0,0.2,0,0.2-0.1c0.1-0.1,0.1-0.1,0.1-0.2c0-0.1,0-0.2,0-0.2C197.8,169.9,197.8,169.9,197.7,169.8L197.7,169.8
		z"/>
            <path fill="#F7AC24" d="M343.6,135.1l-20.3-66.5c-1.7-5.5-8.6-7.3-12.8-3.3l-49.9,48.4c-4.3,4.2-2.4,11.5,3.5,13.1l70.2,18
		C340.1,146.4,345.3,140.9,343.6,135.1L343.6,135.1z"/>
            <path fill="#F3724A" d="M286.6,132.7l25.1,6.4l-2.2,8.5l-25.1-6.4L286.6,132.7z" />
            <path fill="#FEC041" d="M290.9,142.9l12,3.1l-13.7,53.5l-12-3.1L290.9,142.9z" />
            <path fill="#E5AD37" d="M290.9,142.9l12,3.1l-1.1,4.1l-12-3.1L290.9,142.9z" />
            <path fill="#FFFFFF" d="M304.6,114.7c-2.2-0.6-3.6-2.7-3.2-5l5.4-27.2c0.6-3.3,3.9-5.4,7.2-4.6c3.3,0.8,5.2,4.3,4.1,7.5l-8.4,26.5
		C309,114.1,306.8,115.3,304.6,114.7z"/>
            <path fill="#FFFFFF" d="M301.2,127.7c2.4,0.6,4.8-0.8,5.4-3.2c0.6-2.4-0.8-4.8-3.2-5.4c-2.4-0.6-4.8,0.8-5.4,3.2
		C297.4,124.7,298.8,127.1,301.2,127.7z"/>

            <image width="75" height="84" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE8AAABYCAYAAAC056qlAAAACXBIWXMAAC4jAAAuIwF4pT92AAAA
GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAY1JREFUeNrs3dGtwjAMheEmYhNm
YRSmYhRmYRZ4haq0TRzbSfz7FXF1+XrsJFTAslAURcWpNNOLeT2e773Hr/dbAq8CTgMxRYNrCRgW
rwViigwnBcysmfUXADwBIHgCQPAEgOAJCjxB+sATAIJH2/qkDzzOtvIjWs3xjeQx83ySDd4IM0/7
LXLtubf1P156GeDW9x+6Sp7Flfeu9QXMwDklLyLad/oycMb7POAq8YCrnHnA/c69DJxy2wLHGwP2
eKSO5NmvtqRuf8UleRptS+qYeeANhUfLkjzwhsKjZUkeeEPh0bIkDzzwJq3iexgUyQMPPPDAo8Cz
3aaAR/LAAy/SvAOvZfJ6/KwDbTthy27ikT6SZ1J/U8b9jONuzKVPoGhb3balfY87MEueTPIKKloK
j4KTW/4xkkcCTweFDyt74c0KeHY8NZ1hs0C64M2AWLIoqq+eI0GW7ia6+Uaf0eBM8XqGrN2/um96
vSGn+m54S0zpianr45YWZLjfw2gF2fJ8PuxB3+OXV9b1EWAAdeC7tvgHmzAAAAAASUVORK5CYII=" transform="matrix(0.24 0 0 0.24 283.56 166.3598)">
            </image>
            <line fill="#29254C" x1="273.3" y1="203.9" x2="206.3" y2="203.9" />
          </g>
          <g>
            <path fill="#262154" stroke="#695FAA" strokeWidth="8" d="M17.4,173.2h447c5,0,9,5.2,9,11.6v402.3c0,6.4-4,11.6-9,11.6h-447
		c-5,0-9-5.2-9-11.6V184.8C8.4,178.4,12.4,173.2,17.4,173.2z"/>
            <path fill="#695FAA" d="M71.3,163c0.4-1.3,1.2-2.2,2-2.2h334.8c0.8,0,1.5,0.7,1.9,1.8l2.4,6.6c0.9,2.5-0.2,5.8-1.9,5.8h-339
		c-1.6,0-2.7-2.9-2-5.4L71.3,163z"/>
            <path fill="#695FAA" d="M319.7,156.6c0.1-1.9,1.1-3.4,2.2-3.4h31c1.1,0,2.1,1.4,2.2,3.3l0.5,6.6c0.2,2.3-0.9,4.3-2.2,4.3h-32
		c-1.3,0-2.4-2-2.2-4.2L319.7,156.6z"/>
            <ellipse fill="#695FAA" cx="111.5" cy="163.2" rx="7" ry="11.9" />
            <ellipse fill="#695FAA" cx="135.1" cy="163.2" rx="7" ry="11.9" />
            <path fill="#897DBB" d="M108.9,158h5.1c0.9,0,1.7,1.3,1.7,2.8v2.8c0,1.6-0.8,2.8-1.7,2.8h-5.1c-0.9,0-1.7-1.3-1.7-2.8v-2.8
		C107.3,159.3,108,158,108.9,158z"/>
            <path fill="#897DBB" d="M132.5,158h5.1c0.9,0,1.7,1.3,1.7,2.8v2.8c0,1.6-0.8,2.8-1.7,2.8h-5.1c-0.9,0-1.7-1.3-1.7-2.8v-2.8
		C130.8,159.3,131.6,158,132.5,158z"/>
            <path fill="#897DBB" d="M326.3,158h22.5c1.2,0,2.2,1.7,2.2,3.8v0.9c0,2.1-1,3.8-2.2,3.8h-22.5c-1.2,0-2.2-1.7-2.2-3.8v-0.9
		C324,159.7,325,158,326.3,158z"/>
            <path fill="none" stroke="#897DBB" d="M208.3,160.8v8.1v8.1" />
            <path fill="#897DBB" d="M229.4,165.6h1.7c1.1,0,2,1.5,2,3.3l0,0c0,1.8-0.9,3.3-2,3.3h-1.7c-1.1,0-2-1.5-2-3.3l0,0
		C227.4,167.1,228.3,165.6,229.4,165.6z"/>
            <path fill="#897DBB" d="M239.5,165.6h1.7c1.1,0,2,1.5,2,3.3l0,0c0,1.8-0.9,3.3-2,3.3h-1.7c-1.1,0-2-1.5-2-3.3l0,0
		C237.5,167.1,238.4,165.6,239.5,165.6z"/>
            <path fill="#897DBB" d="M249.6,165.6h1.7c1.1,0,2,1.5,2,3.3l0,0c0,1.8-0.9,3.3-2,3.3h-1.7c-1.1,0-2-1.5-2-3.3l0,0
		C247.7,167.1,248.5,165.6,249.6,165.6z"/>
            <path fill="none" stroke="#897DBB" d="M272.4,160.8v8.1v8.1" />
            <path fill="#695FAA" d="M37.6,595.8h407.2l-9.5,12.7c-0.8,1.1-2,1.8-3.2,1.8H49.9c-1.3,0-2.5-0.7-3.3-1.9L37.6,595.8z" />
            <path fill="none" stroke="#897DBB" d="M107.8,595.8v7.2v7.2" />
            <path fill="none" stroke="#897DBB" d="M362.2,595.8v7.2v7.2" />
            <path fill="#695FAA" d="M121.3,601.6h227.4l-7.6,13.5c-0.8,1.5-2.2,2.4-3.6,2.4h-205c-1.4,0-2.8-0.9-3.6-2.4L121.3,601.6z" />
            <ellipse fill="#897DBB" cx="159.8" cy="608.1" rx="1.4" ry="1.8" />
            <path fill="#312D61" d="M167.6,606.9c-0.7-0.9-0.2-2.5,0.8-2.5h137.8c1,0,1.5,1.6,0.8,2.5l-2.9,3.7c-0.5,0.7-1.2,1.1-2,1.1H172.4
		c-0.7,0-1.5-0.4-2-1.1L167.6,606.9z"/>
            <path fill="#897DBB" d="M171.8,604.5h2.2v4.3c0,0.8-0.5,1.4-1.1,1.4l0,0c-0.6,0-1.1-0.6-1.1-1.4V604.5z" />
            <path fill="#897DBB" d="M177.5,604.5h2.2v4.3c0,0.8-0.5,1.4-1.1,1.4l0,0c-0.6,0-1.1-0.6-1.1-1.4V604.5z" />
            <path fill="#897DBB" d="M183.1,604.5h2.2v4.3c0,0.8-0.5,1.4-1.1,1.4l0,0c-0.6,0-1.1-0.6-1.1-1.4V604.5z" />
            <path fill="#897DBB" d="M188.7,604.5h2.2v4.3c0,0.8-0.5,1.4-1.1,1.4l0,0c-0.6,0-1.1-0.6-1.1-1.4V604.5z" />
            <path fill="#897DBB" d="M194.3,604.5h2.2v4.3c0,0.8-0.5,1.4-1.1,1.4l0,0c-0.6,0-1.1-0.6-1.1-1.4V604.5z" />
            <path fill="#897DBB" d="M199.9,604.5h2.2v4.3c0,0.8-0.5,1.4-1.1,1.4l0,0c-0.6,0-1.1-0.6-1.1-1.4V604.5z" />
            <path fill="#897DBB" d="M205.5,604.5h2.2v4.3c0,0.8-0.5,1.4-1.1,1.4l0,0c-0.6,0-1.1-0.6-1.1-1.4V604.5z" />
            <path fill="#897DBB" d="M211.2,604.5h2.2v4.3c0,0.8-0.5,1.4-1.1,1.4l0,0c-0.6,0-1.1-0.6-1.1-1.4V604.5z" />
            <path fill="#897DBB" d="M216.8,604.5h2.2v4.3c0,0.8-0.5,1.4-1.1,1.4l0,0c-0.6,0-1.1-0.6-1.1-1.4V604.5z" />
            <path fill="#897DBB" d="M222.4,604.5h2.2v4.3c0,0.8-0.5,1.4-1.1,1.4l0,0c-0.6,0-1.1-0.6-1.1-1.4V604.5z" />
            <path fill="#897DBB" d="M228,604.5h2.2v4.3c0,0.8-0.5,1.4-1.1,1.4l0,0c-0.6,0-1.1-0.6-1.1-1.4V604.5z" />
            <path fill="#897DBB" d="M233.6,604.5h2.2v4.3c0,0.8-0.5,1.4-1.1,1.4l0,0c-0.6,0-1.1-0.6-1.1-1.4V604.5z" />
            <path fill="#897DBB" d="M239.2,604.5h2.2v4.3c0,0.8-0.5,1.4-1.1,1.4l0,0c-0.6,0-1.1-0.6-1.1-1.4V604.5z" />
            <path fill="#897DBB" d="M244.9,604.5h2.2v4.3c0,0.8-0.5,1.4-1.1,1.4l0,0c-0.6,0-1.1-0.6-1.1-1.4V604.5z" />
            <path fill="#897DBB" d="M250.5,604.5h2.2v4.3c0,0.8-0.5,1.4-1.1,1.4l0,0c-0.6,0-1.1-0.6-1.1-1.4V604.5z" />
            <path fill="#897DBB" d="M256.1,604.5h2.2v4.3c0,0.8-0.5,1.4-1.1,1.4l0,0c-0.6,0-1.1-0.6-1.1-1.4V604.5z" />
            <path fill="#897DBB" d="M261.7,604.5h2.2v4.3c0,0.8-0.5,1.4-1.1,1.4l0,0c-0.6,0-1.1-0.6-1.1-1.4V604.5z" />
            <path fill="#897DBB" d="M267.3,604.5h2.2v4.3c0,0.8-0.5,1.4-1.1,1.4l0,0c-0.6,0-1.1-0.6-1.1-1.4V604.5z" />
            <path fill="#897DBB" d="M272.9,604.5h2.2v4.3c0,0.8-0.5,1.4-1.1,1.4l0,0c-0.6,0-1.1-0.6-1.1-1.4V604.5z" />
            <path fill="#897DBB" d="M278.5,604.5h2.2v4.3c0,0.8-0.5,1.4-1.1,1.4l0,0c-0.6,0-1.1-0.6-1.1-1.4V604.5z" />
            <path fill="#897DBB" d="M284.2,604.5h2.2v4.3c0,0.8-0.5,1.4-1.1,1.4l0,0c-0.6,0-1.1-0.6-1.1-1.4V604.5z" />
            <path fill="#897DBB" d="M289.8,604.5h2.2v4.3c0,0.8-0.5,1.4-1.1,1.4l0,0c-0.6,0-1.1-0.6-1.1-1.4V604.5z" />
            <path fill="#897DBB" d="M295.4,604.5h2.2v4.3c0,0.8-0.5,1.4-1.1,1.4l0,0c-0.6,0-1.1-0.6-1.1-1.4V604.5z" />
            <path fill="#897DBB" d="M301,604.5h2.2v4.3c0,0.8-0.5,1.4-1.1,1.4l0,0c-0.6,0-1.1-0.6-1.1-1.4V604.5z" />
            <ellipse fill="#897DBB" cx="314.8" cy="608.1" rx="1.4" ry="1.8" />
          </g>
          <g onClick={() => setOpenModal(false)}>
            <circle fill="#F37878" cx="468.8" cy="172.2" r="24" />
            <path fill="#FFFFFF" d="M460.2,163.8c0.7-0.7,1.6-1,2.1-0.7l0.1,0.1l15.4,15.4c0.4,0.4,0.1,1.4-0.6,2.2c-0.7,0.7-1.6,1-2.1,0.7
		l-0.1-0.1l-15.4-15.4C459.1,165.5,459.4,164.5,460.2,163.8z"/>
            <path fill="#FFFFFF" d="M477.2,163.6c0.7,0.7,1,1.6,0.7,2.1l-0.1,0.1l-15.4,15.4c-0.4,0.4-1.4,0.1-2.2-0.6c-0.7-0.7-1-1.6-0.7-2.1
		l0.1-0.1l15.4-15.4C475.4,162.5,476.4,162.8,477.2,163.6z"/>
          </g>
          <text transform="matrix(1 0 0 1 171.5043 231.7993)" fill="#FFFFFF" fontSize="24px">HEADS UP!</text>
          <rect x="44.2" y="268.5" fill="none" width="384.5" height="181.1" />
          <text transform="matrix(1 0 0 1 44.1635 281.3528)" fill="#FFFFFF" fontSize="18px">Lorem ipsum dolor sit amet, consectetuer adipi</text>
          <text transform="matrix(1 0 0 1 417.3383 281.3528)" fill="#FFFFFF" fontSize="18px">-</text>
          <text transform="matrix(1 0 0 1 44.1635 302.9524)" fill="#FFFFFF" fontSize="18px">scing elit, sed diam nonummy nibh euismod </text>
          <text transform="matrix(1 0 0 1 44.1635 324.553)" fill="#FFFFFF" fontSize="18px">tincidunt ut laoreet dolore magna aliquam erat </text>
          <text transform="matrix(1 0 0 1 44.1635 346.1526)" fill="#FFFFFF" fontSize="18px">volutpat. Ut wisi enim ad minim veniam, quis </text>
          <text transform="matrix(1 0 0 1 44.1635 367.7532)" fill="#FFFFFF" fontSize="18px">nostrud exerci tation ullamcorper suscipit lobor</text>
          <text transform="matrix(1 0 0 1 415.3344 367.7532)" fill="#FFFFFF" fontSize="18px">-</text>
          <text transform="matrix(1 0 0 1 44.1635 389.3528)" fill="#FFFFFF" fontSize="18px">tis nisl ut aliquip ex ea commodo consequat. </text>
          <text transform="matrix(1 0 0 1 44.1635 410.9524)" fill="#FFFFFF" fontSize="18px">Duis autem vel eum iriure dolor in hendrerit </text>
          <rect x="-84.1" y="470.5" fill="none" width="640.7" height="19.3" />
          <text transform="matrix(1 0 0 1 120.6344 483.3528)" fill="#FFFFFF" fontSize="18px">Do you still want to proceed?</text>
          <g onClick={() => setOpenModal(false)}>
            <path fill="transparent" stroke="#695FAA" strokeWidth="0.75" d="M215.3,551.1H66.9c-4.6,0-8.3-3.7-8.3-8.3v-22c0-4.6,3.7-8.3,8.3-8.3
		h148.4c4.6,0,8.3,3.7,8.3,8.3v22C223.6,547.4,219.9,551.1,215.3,551.1z"/>
            <rect x="98" y="525.5" fill="none" width="86.1" height="19.3" />
            <text transform="matrix(1 0 0 1 104.941 538.3528)" fill="#695FAA" fontSize="18px">CANCEL</text>

          </g>
          <g onClick={() => alert("Aguy! Hindi pa ubra yan utoy!")}>
            <path fill="#695FAA" d="M408.2,551.1H259.8c-4.6,0-8.3-3.7-8.3-8.3v-22c0-4.6,3.7-8.3,8.3-8.3h148.4c4.6,0,8.3,3.7,8.3,8.3v22
		C416.5,547.4,412.8,551.1,408.2,551.1z"/>
            <rect x="300.1" y="525.5" fill="none" width="75.3" height="19.3" />
            <text transform="matrix(1 0 0 1 306.1843 538.3528)" fill="#FFFFFF" fontSize="18px">AGREE</text>
          </g>
        </svg>


      </div>
    )
  }
  useEffect(() => {
    props.setProducts();
  }, [])

  return (
    <div className="dark:bg-gray-800">
      <Head>
        <title>Home | Best Boiler Plate for NextJS</title>
        <meta property="og:image" content="https://drive.google.com/thumbnail?id=1o9PQIe0vmxhCxvL9qY0NsWUUzXsWfjGh" key="ogimage" />
      </Head>
      <NavBar position="fixed" productTitle="">
        <DynamicTable products={product.products} setSelectedProductsNull={_setSelectedProductsNull} />

        <div className={`relative z-10 ${openModal ? `` : `hidden`}`} aria-labelledby="modal-title" role="dialog" aria-modal="true">

          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex  sm:items-center justify-center min-h-full items-center text-center sm:p-0">

              <div className="relative bg-transparent  text-left  transition-all sm:my-8 sm:max-w-2xl sm:w-full xl:block sm:hidden">
                <Svg />
              </div>

              <div className="relative bg-transparent  text-left w-full  max-w-xs sm:w-full xl:hidden sm:block">
                <SvgMobile />
              </div>

            </div>
          </div>
        </div>
      </NavBar>
      <Footer />
    </div>
  )
}

const mapStateToProps = state => ({
  userInfo: state.main,
  error: state.main,
  product: state.product,
})

const mapDispatchToProps = {
  setProducts: setProducts,
  setSelectedProductsNull: setSelectedProductsNull
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)