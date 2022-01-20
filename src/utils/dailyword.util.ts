import { DailyWord, DailyWordDatabase } from "../models";

const MILISSECONDS_IN_A_MINUTE = 60 * 1000;

export function getToday(): string {
  const todayDate = new Date();
  const correctedDate = new Date(
    todayDate.valueOf() - (todayDate.getTimezoneOffset() * MILISSECONDS_IN_A_MINUTE)
  );

  return correctedDate.toISOString().split('T')[0];
}

export function getDailyWord(): DailyWord {
  const dailyWord = dailyWords[getToday()];

  return decode(dailyWord);
}

function decode(dailyWord: DailyWord): DailyWord {
   const day = parseInt(dailyWord.date.split('-')[2]);
   const shift = Math.floor(day/2) + 1;
   const decodedWord = caesarCipher(dailyWord.word, shift);
   
   const decodedDailyWord = { ...dailyWord, word: decodedWord};
   return decodedDailyWord
}

function caesarCipher(str: string, shift: number): string {
  let encoded = ''
  for (let i = 0; i < str.length; i++) {
    let shiftedChar = str.charCodeAt(i) + shift;
    let encodedChar = shiftedChar <= 90 ? shiftedChar : shiftedChar % 90 + 64;
    encoded += String.fromCharCode(encodedChar)
  }
  return encoded
}

const dailyWords: DailyWordDatabase = {
  '2022-01-07': { edition: '001', date: '2022-01-07', word: 'IWNYK' },
  '2022-01-08': { edition: '002', date: '2022-01-08', word: 'KMJNV' },
  '2022-01-09': { edition: '003', date: '2022-01-09', word: 'OMZIJ' },
  '2022-01-10': { edition: '004', date: '2022-01-10', word: 'NOLPI' },
  '2022-01-11': { edition: '005', date: '2022-01-11', word: 'DOXCU' },
  '2022-01-12': { edition: '006', date: '2022-01-12', word: 'TVKXL' },
  '2022-01-13': { edition: '007', date: '2022-01-13', word: 'YXBMH' },
  '2022-01-14': { edition: '008', date: '2022-01-14', word: 'YGLSK' },
  '2022-01-15': { edition: '009', date: '2022-01-15', word: 'TJAYS' },
  '2022-01-16': { edition: '010', date: '2022-01-16', word: 'RKIZF' },
  '2022-01-17': { edition: '011', date: '2022-01-17', word: 'VJGZR' },
  '2022-01-18': { edition: '012', date: '2022-01-18', word: 'JUCFE' },
  '2022-01-19': { edition: '013', date: '2022-01-19', word: 'FBQDE' },
  '2022-01-20': { edition: '014', date: '2022-01-20', word: 'HXVCD' },
  '2022-01-21': { edition: '015', date: '2022-01-21', word: 'KTSPG' },
  '2022-01-22': { edition: '016', date: '2022-01-22', word: 'HFSJO' },
  '2022-01-23': { edition: '017', date: '2022-01-23', word: 'DWHCB' },
  '2022-01-24': { edition: '018', date: '2022-01-24', word: 'OVFRY' },
  '2022-01-25': { edition: '019', date: '2022-01-25', word: 'IBENM' },
  '2022-01-26': { edition: '020', date: '2022-01-26', word: 'QRGEA' },
  '2022-01-27': { edition: '021', date: '2022-01-27', word: 'MZFQE' },
  '2022-01-28': { edition: '022', date: '2022-01-28', word: 'ALDEZ' },
  '2022-01-29': { edition: '023', date: '2022-01-29', word: 'FYSLC' },
  '2022-01-30': { edition: '024', date: '2022-01-30', word: 'FSBEC' },
  '2022-01-31': { edition: '025', date: '2022-01-31', word: 'ZKXQY' },
  '2022-02-01': { edition: '026', date: '2022-02-01', word: 'UHRSZ' },
  '2022-02-02': { edition: '027', date: '2022-02-02', word: 'EMKGJ' },
  '2022-02-03': { edition: '028', date: '2022-02-03', word: 'AYJTM' },
  '2022-02-04': { edition: '029', date: '2022-02-04', word: 'YRWFL' },
  '2022-02-05': { edition: '030', date: '2022-02-05', word: 'IBOAX' },
  '2022-02-06': { edition: '031', date: '2022-02-06', word: 'LEHDW' },
  '2022-02-07': { edition: '032', date: '2022-02-07', word: 'OKRWN' },
  '2022-02-08': { edition: '033', date: '2022-02-08', word: 'XJAMZ' },
  '2022-02-09': { edition: '034', date: '2022-02-09', word: 'OPWVN' },
  '2022-02-10': { edition: '035', date: '2022-02-10', word: 'JULYI' },
  '2022-02-11': { edition: '036', date: '2022-02-11', word: 'GOUZI' },
  '2022-02-12': { edition: '037', date: '2022-02-12', word: 'YTLMH' },
  '2022-02-13': { edition: '038', date: '2022-02-13', word: 'WNEBT' },
  '2022-02-14': { edition: '039', date: '2022-02-14', word: 'FWYJS' },
  '2022-02-15': { edition: '040', date: '2022-02-15', word: 'LGMUS' },
  '2022-02-16': { edition: '041', date: '2022-02-16', word: 'WLEXF' },
  '2022-02-17': { edition: '042', date: '2022-02-17', word: 'GLUVI' },
  '2022-02-18': { edition: '043', date: '2022-02-18', word: 'EDJUC' },
  '2022-02-19': { edition: '044', date: '2022-02-19', word: 'VYDQH' },
  '2022-02-20': { edition: '045', date: '2022-02-20', word: 'GJCPH' },
  '2022-02-21': { edition: '046', date: '2022-02-21', word: 'AXHIP' },
  '2022-02-22': { edition: '047', date: '2022-02-22', word: 'RCQOF' },
  '2022-02-23': { edition: '048', date: '2022-02-23', word: 'CNSBO' },
  '2022-02-24': { edition: '049', date: '2022-02-24', word: 'ZRABE' },
  '2022-02-25': { edition: '050', date: '2022-02-25', word: 'CNVBY' },
  '2022-02-26': { edition: '051', date: '2022-02-26', word: 'RADOM' },
  '2022-02-27': { edition: '052', date: '2022-02-27', word: 'GXFAD' },
  '2022-02-28': { edition: '053', date: '2022-02-28', word: 'ECPXL' },
  '2022-03-01': { edition: '054', date: '2022-03-01', word: 'QTAKN' },
  '2022-03-02': { edition: '055', date: '2022-03-02', word: 'DCSBM' },
  '2022-03-03': { edition: '056', date: '2022-03-03', word: 'TCLSQ' },
  '2022-03-04': { edition: '057', date: '2022-03-04', word: 'DXOFP' },
  '2022-03-05': { edition: '058', date: '2022-03-05', word: 'QBKLO' },
  '2022-03-06': { edition: '059', date: '2022-03-06', word: 'QIXNK' },
  '2022-03-07': { edition: '060', date: '2022-03-07', word: 'APJEW' },
  '2022-03-08': { edition: '061', date: '2022-03-08', word: 'WJOVM' },
  '2022-03-09': { edition: '062', date: '2022-03-09', word: 'XVMIZ' },
  '2022-03-10': { edition: '063', date: '2022-03-10', word: 'FCHXU' },
  '2022-03-11': { edition: '064', date: '2022-03-11', word: 'BYGUF' },
  '2022-03-12': { edition: '065', date: '2022-03-12', word: 'EXTBL' },
  '2022-03-13': { edition: '066', date: '2022-03-13', word: 'VNKBT' },
  '2022-03-14': { edition: '067', date: '2022-03-14', word: 'HSDEG' },
  '2022-03-15': { edition: '068', date: '2022-03-15', word: 'DGMKS' },
  '2022-03-16': { edition: '069', date: '2022-03-16', word: 'ILSVF' },
  '2022-03-17': { edition: '070', date: '2022-03-17', word: 'QZETF' },
  '2022-03-18': { edition: '071', date: '2022-03-18', word: 'UIFYQ' },
  '2022-03-19': { edition: '072', date: '2022-03-19', word: 'LUBXE' },
  '2022-03-20': { edition: '073', date: '2022-03-20', word: 'EPSGT' },
  '2022-03-21': { edition: '074', date: '2022-03-21', word: 'QDGSP' },
  '2022-03-22': { edition: '075', date: '2022-03-22', word: 'QOADW' },
  '2022-03-23': { edition: '076', date: '2022-03-23', word: 'XCUOF' },
  '2022-03-24': { edition: '077', date: '2022-03-24', word: 'ZRVNF' },
  '2022-03-25': { edition: '078', date: '2022-03-25', word: 'PBGNE' },
  '2022-03-26': { edition: '079', date: '2022-03-26', word: 'NDUMX' },
  '2022-03-27': { edition: '080', date: '2022-03-27', word: 'HQXMD' },
  '2022-03-28': { edition: '081', date: '2022-03-28', word: 'CPMFD' },
  '2022-03-29': { edition: '082', date: '2022-03-29', word: 'QFCEZ' },
  '2022-03-30': { edition: '083', date: '2022-03-30', word: 'LBEDK' },
  '2022-03-31': { edition: '084', date: '2022-03-31', word: 'PSMRK' },
  '2022-04-01': { edition: '085', date: '2022-04-01', word: 'MHUDK' },
  '2022-04-02': { edition: '086', date: '2022-04-02', word: 'CVGRM' },
  '2022-04-03': { edition: '087', date: '2022-04-03', word: 'ZYRCP' },
  '2022-04-04': { edition: '088', date: '2022-04-04', word: 'XYOFI' },
  '2022-04-05': { edition: '089', date: '2022-04-05', word: 'YXDOB' },
  '2022-04-06': { edition: '090', date: '2022-04-06', word: 'ZKYWO' },
  '2022-04-07': { edition: '091', date: '2022-04-07', word: 'HQVEN' },
  '2022-04-08': { edition: '092', date: '2022-04-08', word: 'BPDOV' },
  '2022-04-09': { edition: '093', date: '2022-04-09', word: 'HVXJN' },
  '2022-04-10': { edition: '094', date: '2022-04-10', word: 'MCHBI' },
  '2022-04-11': { edition: '095', date: '2022-04-11', word: 'VODUI' },
  '2022-04-12': { edition: '096', date: '2022-04-12', word: 'OTKBS' },
  '2022-04-13': { edition: '097', date: '2022-04-13', word: 'FXBTL' },
  '2022-04-14': { edition: '098', date: '2022-04-14', word: 'UJAKW' },
  '2022-04-15': { edition: '099', date: '2022-04-15', word: 'TSFAJ' },
  '2022-04-16': { edition: '100', date: '2022-04-16', word: 'KIVTF' },
}