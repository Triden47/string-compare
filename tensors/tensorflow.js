
// import * as tf from '@tensorflow/tfjs';
const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');
const use = require('@tensorflow-models/universal-sentence-encoder');

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const banks = [
  'aus',
  'axis',
  'axisc',
  'bdnc',
  'bdnr',
  'bobc',
  'bobr',
  'boi',
  'bom',
  'canara',
  'cbi',
  'csb',
  'cub',
  'dbs',
  'deutsche',
  'dhanlakshmi',
  'equitas',
  'federal',
  'hdfc',
  'icici',
  'idfc',
  'indian',
  'indusind',
  'iob',
  'iobc',
  'jkb',
  'karnatka',
  'karur',
  'kotak',
  'lvbc',
  'lvbr',
  'pnbc',
  'pnbr',
  'rbl',
  'rblc',
  'saraswat',
  'sbi',
  'sbic',
  'scb',
  'shivalik',
  'sib',
  'sur',
  'tamcop',
  'tammerc',
  'uco',
  'union',
  'utk',
  'yes',
]

let initialData = [
  { input: 'au small finance bank', output: 'aus' },
  { input: 'aus', output: 'aus' },
  { input: 'au small finance bank limited', output: 'aus' },
  { input: 'au small', output: 'aus' },
  { input: 'au small finance', output: 'aus' },
  { input: 'au', output: 'aus' },
  { input: 'aublr', output: 'aus' },
  { input: 'au finance bank', output: 'aus' },
  { input: 'au small bank', output: 'aus' },

  { input: 'axis bank', output: 'axis' },
  { input: 'axis', output: 'axis' },
  { input: 'utibr', output: 'axis' },

  { input: 'axisc', output: 'axisc' },
  { input: 'axis corporate', output: 'axisc' },
  { input: 'utibc', output: 'axisc' },
  { input: 'axis corporate bank', output: 'axisc' },
  { input: 'axis corp bank', output: 'axisc' },

  { input: 'bandhan bank', output: 'bdnc' },
  { input: 'bandhan', output: 'bdnc' },
  { input: 'bdnc', output: 'bdnc' },
  { input: 'bandhan corporate', output: 'bdnc' },
  { input: 'bdblc', output: 'bdnc' },

  { input: 'bdnr', output: 'bdnr' },
  { input: 'bandhan retail', output: 'bdnr' },
  { input: 'bdblr', output: 'bdnr' },
  { input: 'bandhan bank retail', output: 'bdnr' },

  { input: 'bobc', output: 'bobc' },
  { input: 'bank of baroda', output: 'bobc' },
  { input: 'barbc', output: 'bobc' },
  { input: 'baroda', output: 'bobc' },
  { input: 'baroda corporate', output: 'bobc' },

  { input: 'bobr', output: 'bobr' },
  { input: 'barbr', output: 'bobr' },
  { input: 'bank of baroda retail', output: 'bobr' },
  { input: 'baroda retail', output: 'bobr' },

  { input: 'boi', output: 'boi' },
  { input: 'bank of india', output: 'boi' },
  { input: 'bkidr', output: 'boi' },
  { input: 'bkidc', output: 'boi' },

  { input: 'bom', output: 'bom' },
  { input: 'bank of maharashtra', output: 'bom' },
  { input: 'mahbr', output: 'bom' },
  { input: 'bank maharashtra', output: 'bom' },

  { input: 'canara', output: 'canara' },
  { input: 'canara bank', output: 'canara' },
  { input: 'cnrbr', output: 'canara' },

  { input: 'central bank of india', output: 'cbi' },
  { input: 'cbi', output: 'cbi' },
  { input: 'cbinr', output: 'cbi' },
  { input: 'central bank', output: 'cbi' },
  { input: 'central', output: 'cbi' },

  { input: 'csb bank', output: 'csb' },
  { input: 'csb', output: 'csb' },
  { input: 'catholic syrian bank limited', output: 'csb' },
  { input: 'catholic syrian bank', output: 'csb' },
  { input: 'csbkr', output: 'csb' },

  { input: 'city union bank', output: 'cub' },
  { input: 'cub', output: 'cub' },
  { input: 'ciubr', output: 'cub' },
  { input: 'ciubc', output: 'cub' },
  { input: 'city union', output: 'cub' },

  { input: 'dbs', output: 'dbs' },
  { input: 'dbs bank', output: 'dbs' },
  { input: 'digibank', output: 'dbs' },
  { input: 'dbssr', output: 'dbs' },
  { input: 'digi bank', output: 'dbs' },

  { input: 'deutsche', output: 'deutsche' },
  { input: 'deutsche bank', output: 'deutsche' },
  { input: 'deutr', output: 'deutsche' },

  { input: 'dhanlakshmi', output: 'dhanlakshmi' },
  { input: 'dhanlakshmi bank', output: 'dhanlakshmi' },
  { input: 'dlxbr', output: 'dhanlakshmi' },
  { input: 'dlxbc', output: 'dhanlakshmi' },

  { input: 'equitas small finance bank', output: 'equitas' },
  { input: 'equitas', output: 'equitas' },
  { input: 'equitas small finance', output: 'equitas' },
  { input: 'equitas bank', output: 'equitas' },
  { input: 'esfbr', output: 'equitas' },

  { input: 'federal bank', output: 'federal' },
  { input: 'federal', output: 'federal' },
  { input: 'fdrlr', output: 'federal' },

  { input: 'hdfc', output: 'hdfc' },
  { input: 'hdfc bank', output: 'hdfc' },
  { input: 'hdfcr', output: 'hdfc' },
  { input: 'hdfcc', output: 'hdfc' },
  { input: 'hdfc retail', output: 'hdfc' },
  { input: 'hdfc corporate', output: 'hdfc' },

  { input: 'icici', output: 'icici' },
  { input: 'icici bank', output: 'icici' },
  { input: 'icicr', output: 'icici' },
  { input: 'icicc', output: 'icici' },
  { input: 'icici retail', output: 'icici' },
  { input: 'icici corporate', output: 'icici' },

  { input: 'idfc', output: 'idfc' },
  { input: 'idfc bank', output: 'idfc' },
  { input: 'idfc first bank', output: 'idfc' },
  { input: 'idfbr', output: 'idfc' },

  { input: 'indian', output: 'indian' },
  { input: 'indian bank', output: 'indian' },
  { input: 'idibr', output: 'indian' },

  { input: 'indusind', output: 'indusind' },
  { input: 'indusind bank', output: 'indusind' },
  { input: 'indbr', output: 'indusind' },

  { input: 'iob', output: 'iob' },
  { input: 'iob bank', output: 'iob' },
  { input: 'indian overseas bank', output: 'iob' },
  { input: 'indian overseas', output: 'iob' },
  { input: 'iobar', output: 'iob' },

  { input: 'iobc', output: 'iobc' },
  { input: 'iob corporate', output: 'iobc' },
  { input: 'indian overseas corporate', output: 'iobc' },
  { input: 'indian overseas bank corporate', output: 'iobc' },
  { input: 'iobac', output: 'iobc' },

  { input: 'jkb', output: 'jkb' },
  { input: 'jammu & kashmir bank', output: 'jkb' },
  { input: 'jammu and kashmir bank', output: 'jkb' },
  { input: 'j&k bank', output: 'jkb' },
  { input: 'jammu kashmir bank', output: 'jkb' },
  { input: 'jakar', output: 'jkb' },

  { input: 'karnataka', output: 'karnatka' },
  { input: 'karnataka bank', output: 'karnatka' },
  { input: 'karbr', output: 'karnatka' },

  { input: 'karur', output: 'karur' },
  { input: 'karur bank', output: 'karur' },
  { input: 'karur vysya bank', output: 'karur' },
  { input: 'karur vysya', output: 'karur' },
  { input: 'kvblr', output: 'karur' },

  { input: 'kotak', output: 'kotak' },
  { input: 'kotak bank', output: 'kotak' },
  { input: 'kkbkr', output: 'kotak' },

  { input: 'lvbc', output: 'lvbc' },
  { input: 'lvb corporate', output: 'lvbc' },
  { input: 'lavbc', output: 'lvbc' },

  { input: 'lvbr', output: 'lvbr' },
  { input: 'lvb retail', output: 'lvbr' },
  { input: 'lavbr', output: 'lvbr' },

  { input: 'pnbc', output: 'pnbc' },
  { input: 'punjab national bank corporate', output: 'pnbc' },
  { input: 'pnb', output: 'pnbc' },
  { input: 'punjab national bank', output: 'pnbc' },
  { input: 'punbc', output: 'pnbc' },
  { input: 'punjab corporate', output: 'pnbc' },
  { input: 'punjab national corporate', output: 'pnbc' },

  { input: 'pnbr', output: 'pnbr' },
  { input: 'punjab national bank retail', output: 'pnbr' },
  { input: 'punbr', output: 'pnbr' },
  { input: 'punjab national retail', output: 'pnbr' },
  { input: 'punjab retail', output: 'pnbr' },

  { input: 'rbl', output: 'rbl' },
  { input: 'ratnakar bank', output: 'rbl' },
  { input: 'rbl bank', output: 'rbl' },
  { input: 'ratnr', output: 'rbl' },
  { input: 'ratnakar', output: 'rbl' },

  { input: 'rbl corporate', output: 'rblc' },
  { input: 'rblc', output: 'rblc' },
  { input: 'ratnc', output: 'rblc' },
  { input: 'ratnakar corporate bank', output: 'rbl' },

  { input: 'saraswat', output: 'saraswat' },
  { input: 'saraswat bank', output: 'saraswat' },
  { input: 'srcbr', output: 'saraswat' },

  { input: 'sbi', output: 'sbi' },
  { input: 'state bank of india', output: 'sbi' },
  { input: 'sbinr', output: 'sbi' },
  { input: 'state bank', output: 'sbi' },
  { input: 'state bank retail', output: 'sbi' },

  { input: 'sbic', output: 'sbic' },
  { input: 'sbi corporate', output: 'sbic' },
  { input: 'state bank of india corporate', output: 'sbic' },
  { input: 'sbinc', output: 'sbic' },
  { input: 'state bank corporate', output: 'sbic' },

  { input: 'scb', output: 'scb' },
  { input: 'standard chartered', output: 'scb' },
  { input: 'standard chartered bank', output: 'scb' },
  { input: 'scblr', output: 'scb' },
  { input: 'chartered', output: 'scb' },

  { input: 'shivalik', output: 'shivalik' },
  { input: 'shivalik bank', output: 'shivalik' },
  { input: 'smcbr', output: 'shivalik' },

  { input: 'sib', output: 'sib' },
  { input: 'south indian bank', output: 'sib' },
  { input: 'siblr', output: 'sib' },
  { input: 'south bank', output: 'sib' },
  { input: 'south', output: 'sib' },
  { input: 'south bank retail', output: 'sib' },

  { input: 'sur', output: 'sur' },
  { input: 'sur bank', output: 'sur' },

  { input: 'tamcop', output: 'tamcop' },
  { input: 'tamcop bank', output: 'tamcop' },

  { input: 'tammerc', output: 'tammerc' },
  { input: 'tammerc bank', output: 'tammerc' },

  { input: 'uco', output: 'uco' },
  { input: 'uco bank', output: 'uco' },
  { input: 'united commercial bank', output: 'uco' },
  { input: 'united bank', output: 'uco' },
  { input: 'united commercial', output: 'uco' },
  { input: 'ucbar', output: 'uco' },
  { input: 'ucbac', output: 'uco' },
  { input: 'united commercial retail', output: 'uco' },
  { input: 'united commercial corporate', output: 'uco' },

  { input: 'union', output: 'union' },
  { input: 'union bank', output: 'union' },
  { input: 'ubinr', output: 'union' },
  { input: 'ubinc', output: 'union' },
  { input: 'union bank corporate', output: 'union' },
  { input: 'union bank retail', output: 'union' },

  { input: 'utk', output: 'utk' },
  { input: 'utk bank', output: 'utk' },
  { input: 'utkarsh small finance bank', output: 'utk' },
  { input: 'utkarsh small finance', output: 'utk' },
  { input: 'utkarsh finance', output: 'utk' },
  { input: 'utkarsh finance bank', output: 'utk' },
  { input: 'utksr', output: 'utk' },
  { input: 'utkarsh small finance retail', output: 'utk' },

  { input: 'yes', output: 'yes' },
  { input: 'yes bank', output: 'yes' },
  { input: 'yesbc', output: 'yes' },
  { input: 'yesbr', output: 'yes' },
  { input: 'yes bank corporate', output: 'yes' },
  { input: 'yes bank retail', output: 'yes' },
]

const generatedData = [
  // { input: 'a u s', output: 'aus' },
  // { input: 'a-u-s', output: 'aus' },
  // { input: 'a_u_s', output: 'aus' },
  // { input: 'a.u.s', output: 'aus' },
  // { input: 'a x i s', output: 'axis' },
  // { input: 'a-x-i-s', output: 'axis' },
  // { input: 'a_x_i_s', output: 'axis' },
  // { input: 'a.x.i.s', output: 'axis' },
  // { input: 'b d n c', output: 'bdnc' },
  // { input: 'b-d-n-c', output: 'bdnc' },
  // { input: 'b_d_n_c', output: 'bdnc' },
  // { input: 'b.d.n.c', output: 'bdnc' },
  // { input: 'b d n r', output: 'bdnr' },
  // { input: 'b-d-n-r', output: 'bdnr' },
  // { input: 'b_d_n_r', output: 'bdnr' },
  // { input: 'b.d.n.r', output: 'bdnr' },
  // { input: 'b o b c', output: 'bobc' },
  // { input: 'b-o-b-c', output: 'bobc' },
  // { input: 'b_o_b_c', output: 'bobc' },
  // { input: 'b.o.b.c', output: 'bobc' },
  // { input: 'b o b r', output: 'bobr' },
  // { input: 'b-o-b-r', output: 'bobr' },
  // { input: 'b_o_b_r', output: 'bobr' },
  // { input: 'b.o.b.r', output: 'bobr' },
  // { input: 'b o i', output: 'boi' },
  // { input: 'b-o-i', output: 'boi' },
  // { input: 'b_o_i', output: 'boi' },
  // { input: 'b.o.i', output: 'boi' },
  // { input: 'b o m', output: 'bom' },
  // { input: 'b-o-m', output: 'bom' },
  // { input: 'b_o_m', output: 'bom' },
  // { input: 'b.o.m', output: 'bom' },
  // { input: 'c b i', output: 'cbi' },
  // { input: 'c-b-i', output: 'cbi' },
  // { input: 'c_b_i', output: 'cbi' },
  // { input: 'c.b.i', output: 'cbi' },
  // { input: 'c s b', output: 'csb' },
  // { input: 'c-s-b', output: 'csb' },
  // { input: 'c_s_b', output: 'csb' },
  // { input: 'c.s.b', output: 'csb' },
  // { input: 'c u b', output: 'cub' },
  // { input: 'c-u-b', output: 'cub' },
  // { input: 'c_u_b', output: 'cub' },
  // { input: 'c.u.b', output: 'cub' },
  // { input: 'd b s', output: 'dbs' },
  // { input: 'd-b-s', output: 'dbs' },
  // { input: 'd_b_s', output: 'dbs' },
  // { input: 'd.b.s', output: 'dbs' },
  // { input: 'h d f c', output: 'hdfc' },
  // { input: 'h-d-f-c', output: 'hdfc' },
  // { input: 'h_d_f_c', output: 'hdfc' },
  // { input: 'h.d.f.c', output: 'hdfc' },
  // { input: 'i c i c i', output: 'icici' },
  // { input: 'i-c-i-c-i', output: 'icici' },
  // { input: 'i_c_i_c_i', output: 'icici' },
  // { input: 'i.c.i.c.i', output: 'icici' },
  // { input: 'i d f c', output: 'idfc' },
  // { input: 'i-d-f-c', output: 'idfc' },
  // { input: 'i_d_f_c', output: 'idfc' },
  // { input: 'i.d.f.c', output: 'idfc' },
  // { input: 'i o b', output: 'iob' },
  // { input: 'i-o-b', output: 'iob' },
  // { input: 'i_o_b', output: 'iob' },
  // { input: 'i.o.b', output: 'iob' },
  // { input: 'i o b c', output: 'iobc' },
  // { input: 'i-o-b-c', output: 'iobc' },
  // { input: 'i_o_b_c', output: 'iobc' },
  // { input: 'i.o.b.c', output: 'iobc' },
  // { input: 'j k b', output: 'jkb' },
  // { input: 'j-k-b', output: 'jkb' },
  // { input: 'j_k_b', output: 'jkb' },
  // { input: 'j.k.b', output: 'jkb' },
  // { input: 'l v b c', output: 'lvbc' },
  // { input: 'l-v-b-c', output: 'lvbc' },
  // { input: 'l_v_b_c', output: 'lvbc' },
  // { input: 'l.v.b.c', output: 'lvbc' },
  // { input: 'l v b r', output: 'lvbr' },
  // { input: 'l-v-b-r', output: 'lvbr' },
  // { input: 'l_v_b_r', output: 'lvbr' },
  // { input: 'l.v.b.r', output: 'lvbr' },
  // { input: 'p n b c', output: 'pnbc' },
  // { input: 'p-n-b-c', output: 'pnbc' },
  // { input: 'p_n_b_c', output: 'pnbc' },
  // { input: 'p.n.b.c', output: 'pnbc' },
  // { input: 'p n b r', output: 'pnbr' },
  // { input: 'p-n-b-r', output: 'pnbr' },
  // { input: 'p_n_b_r', output: 'pnbr' },
  // { input: 'p.n.b.r', output: 'pnbr' },
  // { input: 'r b l', output: 'rbl' },
  // { input: 'r-b-l', output: 'rbl' },
  // { input: 'r_b_l', output: 'rbl' },
  // { input: 'r.b.l', output: 'rbl' },
  // { input: 'r b l c', output: 'rblc' },
  // { input: 'r-b-l-c', output: 'rblc' },
  // { input: 'r_b_l_c', output: 'rblc' },
  // { input: 'r.b.l.c', output: 'rblc' },
  // { input: 's b i', output: 'sbi' },
  // { input: 's-b-i', output: 'sbi' },
  // { input: 's_b_i', output: 'sbi' },
  // { input: 's.b.i', output: 'sbi' },
  // { input: 's b i c', output: 'sbic' },
  // { input: 's-b-i-c', output: 'sbic' },
  // { input: 's_b_i_c', output: 'sbic' },
  // { input: 's.b.i.c', output: 'sbic' },
  // { input: 's c b', output: 'scb' },
  // { input: 's-c-b', output: 'scb' },
  // { input: 's_c_b', output: 'scb' },
  // { input: 's.c.b', output: 'scb' },
  // { input: 's i b', output: 'sib' },
  // { input: 's-i-b', output: 'sib' },
  // { input: 's_i_b', output: 'sib' },
  // { input: 's.i.b', output: 'sib' },
  // { input: 's u r', output: 'sur' },
  // { input: 's-u-r', output: 'sur' },
  // { input: 's_u_r', output: 'sur' },
  // { input: 's.u.r', output: 'sur' },
  // { input: 'u c o', output: 'uco' },
  // { input: 'u-c-o', output: 'uco' },
  // { input: 'u_c_o', output: 'uco' },
  // { input: 'u.c.o', output: 'uco' },
  // { input: 'u t k', output: 'utk' },
  // { input: 'u-t-k', output: 'utk' },
  // { input: 'u_t_k', output: 'utk' },
  // { input: 'u.t.k', output: 'utk' },
  // { input: 'y e s', output: 'yes' },
  // { input: 'y-e-s', output: 'yes' },
  // { input: 'y_e_s', output: 'yes' },
  // { input: 'y.e.s', output: 'yes' },

  // { input: 'bobc', output: 'bobc' },
  // { input: 'bank of baroda', output: 'bobc' },
  // { input: 'barbc', output: 'bobc' },
  // { input: 'bank of baroda corporate', output: 'bobc' },
  // { input: 'corporate bobc', output: 'bobc' },
  // { input: 'baroda bank of', output: 'bobc' },
  // { input: 'bobc bank', output: 'bobc' },
  // { input: 'bobc baroda', output: 'bobc' },
  // { input: 'baroda', output: 'bobc' },
  // { input: 'bank baroda corporate', output: 'bobc' },
  // { input: 'corporate of bank baroda', output: 'bobc' },
  // { input: 'bank of bobc', output: 'bobc' },
  // { input: 'baroda corporate bank of', output: 'bobc' },
  // { input: 'baroda bank corporate', output: 'bobc' },
  // { input: 'corporate bobc baroda', output: 'bobc' },
  // { input: 'corporate baroda of bobc', output: 'bobc' },
  // { input: 'bobc bank of baroda', output: 'bobc' },
  // { input: 'baroda bank of bobc', output: 'bobc' },
  // { input: 'corporate of bobc', output: 'bobc' },
  // { input: 'of corporate bobc bank', output: 'bobc' },
  // { input: 'bank corporate baroda of', output: 'bobc' },
  // { input: 'of baroda corporate bobc', output: 'bobc' },
  // { input: 'bank corporate bobc baroda', output: 'bobc' },
  // { input: 'baroda of bank bobc', output: 'bobc' },
  // { input: 'of bobc baroda corporate', output: 'bobc' },
  // { input: 'bank baroda bobc', output: 'bobc' },
  // { input: 'bobc corporate of bank', output: 'bobc' },
  // { input: 'bobc of baroda bank', output: 'bobc' },
  // { input: 'of bobc baroda bank corporate', output: 'bobc' },
  // { input: 'bank of corporate baroda bobc', output: 'bobc' },
  // { input: 'of bank bobc baroda', output: 'bobc' },
  // { input: 'bank of bobc baroda corporate', output: 'bobc' },
  // { input: 'baroda of corporate bobc bank', output: 'bobc' },
  // { input: 'of bobc bank', output: 'bobc' },
  // { input: 'bobc baroda corporate bank of', output: 'bobc' },
  // { input: 'corporate baroda bobc bank of', output: 'bobc' },
  // { input: 'of corporate bobc baroda bank', output: 'bobc' },
  // { input: 'baroda bank of bobc corporate', output: 'bobc' },

  // { input: 'bobr', output: 'bobr' },
  // { input: 'barbr', output: 'bobr' },
  // { input: 'bank of baroda retail', output: 'bobr' },
  // { input: 'retail bobr', output: 'bobr' },
  // { input: 'baroda retail bank of', output: 'bobr' },
  // { input: 'retail of bobr', output: 'bobr' },
  // { input: 'barbr retail bank of bobr', output: 'bobr' },
  // { input: 'bobr retail bank', output: 'bobr' },
  // { input: 'retail baroda bobr of bank', output: 'bobr' },
  // { input: 'bank retail bobr baroda of', output: 'bobr' },
  // { input: 'retail bank of bobr baroda', output: 'bobr' },
  // { input: 'retail baroda bank bobr of', output: 'bobr' },
  // { input: 'bank of bobr retail baroda', output: 'bobr' },
  // { input: 'bobr retail baroda', output: 'bobr' },
  // { input: 'of retail bobr baroda bank', output: 'bobr' },
  // { input: 'baroda of bobr retail', output: 'bobr' },
  // { input: 'retail bank bobr', output: 'bobr' },
  // { input: 'of barbr retail bobr bank', output: 'bobr' },
  // { input: 'of retail barbr bobr', output: 'bobr' },
  // { input: 'retail bobr baroda of bank', output: 'bobr' },
  // { input: 'baroda bobr retail', output: 'bobr' },
  // { input: 'retail bobr baroda bank of', output: 'bobr' },
  // { input: 'of retail barbr bobr bank', output: 'bobr' },
  // { input: 'bobr bank of baroda retail', output: 'bobr' },
  // { input: 'baroda bank retail of bobr', output: 'bobr' },
  // { input: 'retail bank bobr baroda of', output: 'bobr' },
  // { input: 'of retail barbr bobr bank', output: 'bobr' },
  // { input: 'retail bobr bank of baroda', output: 'bobr' },
  // { input: 'of bobr retail baroda', output: 'bobr' },
  // { input: 'baroda of bobr retail', output: 'bobr' },
  // { input: 'retail bank of bobr baroda', output: 'bobr' },
  // { input: 'bobr retail baroda bank of', output: 'bobr' },
  // { input: 'of retail bobr baroda', output: 'bobr' },
  // { input: 'baroda bobr retail of bank', output: 'bobr' },
  // { input: 'retail bobr bank baroda', output: 'bobr' },
  // { input: 'bobr retail of bank baroda', output: 'bobr' },
  // { input: 'baroda of retail bobr bank', output: 'bobr' },
  // { input: 'bank bobr baroda of retail', output: 'bobr' },
  // { input: 'baroda of bobr retail', output: 'bobr' },

  // { input: 'au small finance bank', output: 'aus' }
  // ,
  // { input: 'a-u small finance bank', output: 'aus' }
  // ,
  // { input: 'au_small finance bank', output: 'aus' }
  // ,
  // { input: 'au small_finance bank', output: 'aus' }
  // ,
  // { input: 'au small finance.bank', output: 'aus' }
  // ,
  // { input: 'au small finance bank_limited', output: 'aus' }
  // ,
  // { input: 'au small finance_bank limited', output: 'aus' }
  // ,
  // { input: 'au small finance bank limited', output: 'aus' }
  // ,
  // { input: 'au small.finance bank limited', output: 'aus' }
  // ,
  // { input: 'au_small finance bank limited', output: 'aus' }
  // ,
  // { input: 'au small_fin.ance bank limited', output: 'aus' }
  // ,
  // { input: 'au small finance bank_limited', output: 'aus' }
  // ,
  // { input: 'au__small finance bank limited', output: 'aus' }
  // ,
  // { input: 'a u small finance bank limited', output: 'aus' }
  // ,
  // { input: 'au small finance bank limited', output: 'aus' }
  // ,
  // { input: 'au. small finance bank limited', output: 'aus' }
  // ,
  // { input: 'au small finance bank_limited', output: 'aus' }
  // ,
  // { input: 'au small finance bank_li-mited', output: 'aus' }
  // ,
  // { input: 'au small finance banklimited', output: 'aus' }
  // ,
  // { input: 'aublr', output: 'aus' }
  // ,
  // { input: 'a-xis bank', output: 'axis' }
  // ,
  // { input: 'axis b-an-k', output: 'axis' }
  // ,
  // { input: 'u.ti_br', output: 'axis' }
  // ,
  // { input: 'axi_s bank', output: 'axis' }
  // ,
  // { input: 'axi.s ba_nk', output: 'axis' }
  // ,
  // { input: 'uti br', output: 'axis' }
  // ,
  // { input: 'axis_ban_k', output: 'axis' }
  // ,
  // { input: 'axi_s', output: 'axis' }
  // ,
  // { input: 'a-xis', output: 'axis' }
  // ,
  // { input: '_axis', output: 'axis' }
  // ,
  // { input: 'ut_ib_r', output: 'axis' }
  // ,
  // { input: 'u t i_b_r', output: 'axis' }
  // ,
  // { input: 'axis ban_k', output: 'axis' }
  // ,
  // { input: 'ut-ib.r', output: 'axis' }
  // ,
  // { input: 'axi_sban_k', output: 'axis' }
  // ,
  // { input: 'axi-s', output: 'axis' }
  // ,
  // { input: 'u_ti.br', output: 'axis' }
  // ,
  // { input: 'axisban_k', output: 'axis' }
  // ,
  // { input: 'ax_is', output: 'axis' }
  // ,
  // { input: 'axis b-an_k', output: 'axis' }
  // ,
  // { input: 'u.ti_.br', output: 'axis' }
  // ,
  // { input: 'ax_is bank', output: 'axis' }
  // ,
  // { input: 'ut_.ibr', output: 'axis' }
  // ,
  // { input: 'axis ban-_k', output: 'axis' }
  // ,
  // { input: 'ut-ib_r', output: 'axis' }
  // ,
  // { input: 'a_xis bank', output: 'axis' }
  // ,
  // { input: 'u-ti_.br', output: 'axis' }
  // ,
  // { input: 'ax-is bank', output: 'axis' }
  // ,
  // { input: 'axi-sba_nk', output: 'axis' }
  // ,
  // { input: 'ut-i_br', output: 'axis' }
  // ,
  // { input: 'axisb_an_k', output: 'axis' }
  // ,
  // { input: 'ut_i.br', output: 'axis' }
  // ,
  // { input: 'axisban-k', output: 'axis' }
  // ,
  // { input: 'ax-i_s', output: 'axis' }
  // ,
  // { input: 'uti-b.r', output: 'axis' }
  // ,
  // { input: 'axisba_nk', output: 'axis' }
  // ,
  // { input: 'u_t.i_br', output: 'axis' }
  // ,
  // { input: 'axis-ban_k', output: 'axis' }
  // ,
  // { input: 'u_ti.b_r', output: 'axis' }
  // ,
  // { input: 'dhanlakshmi_b-a-nk', output: 'dhanlakshmi' }
  // ,
  // { input: 'dlx_br', output: 'dhanlakshmi' }
  // ,
  // { input: 'd_l_xbc', output: 'dhanlakshmi' }
  // ,
  // { input: 'd-l-x.b_r', output: 'dhanlakshmi' }
  // ,
  // { input: 'dhanlakshmi_ -b a n k', output: 'dhanlakshmi' }
  // ,
  // { input: 'd_h_a_n_l-a_k sh.m_i', output: 'dhanlakshmi' }
  // ,
  // { input: 'dlx bc', output: 'dhanlakshmi' }
  // ,
  // { input: 'dlxbc', output: 'dhanlakshmi' }
  // ,
  // { input: 'dhanlakshmi_ ', output: 'dhanlakshmi' }
  // ,
  // { input: 'dhanlakshmi---', output: 'dhanlakshmi' }
  // ,
  // { input: '_-.-..._..', output: 'dhanlakshmi' }
  // ,
  // { input: '___...', output: 'dhanlakshmi' }
  // ,
  // { input: 'dha nlak sh mi', output: 'dhanlakshmi' }
  // ,
  // { input: 'd-a-n-l-a-k-s-h m-i', output: 'dhanlakshmi' }
  // ,
  // { input: 'dhanlak..shmi', output: 'dhanlakshmi' }
  // ,
  // { input: 'dlx,b r', output: 'dhanlakshmi' }
  // ,
  // { input: 'd_lx_b_c', output: 'dhanlakshmi' }
  // ,
  // { input: 'd-lx b,c', output: 'dhanlakshmi' }
  // ,
  // { input: 'dh_an lak shMi', output: 'dhanlakshmi' }
  // ,
  // { input: 'dhAnl!akshmi', output: 'dhanlakshmi' }
  // ,
  // { input: 'dh_anlak@@shmi', output: 'dhanlakshmi' }
  // ,
  // { input: 'dha nla_kshmi', output: 'dhanlakshmi' }
  // ,
  // { input: 'dhan lakshmi', output: 'dhanlakshmi' }
  // ,
  // { input: 'dhan!lakshmi', output: 'dhanlakshmi' }
  // ,
  // { input: 'dhan_lak_sh_mi', output: 'dhanlakshmi' }
  // ,
  // { input: 'd..hanlakshmi', output: 'dhanlakshmi' }
  // ,
  // { input: 'dhanl akshmi', output: 'dhanlakshmi' }
  // ,
  // { input: 'd_hanlak_s_hmi', output: 'dhanlakshmi' }
  // ,
  // { input: 'dha-nlak_sh-mi', output: 'dhanlakshmi' }
  // ,
  // { input: 'dhanlaksh-mi', output: 'dhanlakshmi' }
  // ,
  // { input: 'd!han!lakshmi', output: 'dhanlakshmi' }
  // ,
  // { input: 'dhan_lakshmi', output: 'dhanlakshmi' }
  // ,
  // { input: 'dhan lak_shmi', output: 'dhanlakshmi' }
  // ,
  // { input: 'dhanl_ak--shmi', output: 'dhanlakshmi' }
  // ,
  // { input: 'dhanl aksh..mi', output: 'dhanlakshmi' }
  // ,
  // { input: 'dha_nlaksh..mi', output: 'dhanlakshmi' }
  // ,
  // { input: 'equitas_small_finance_bank', output: 'equitas' }
  // ,
  // { input: 'equitas.bank', output: 'equitas' }
  // ,
  // { input: 'equitas_finance_bank', output: 'equitas' }
  // ,
  // { input: 'esfbr_', output: 'equitas' }
  // ,
  // { input: 'equitas_small finance bank', output: 'equitas' }
  // ,
  // { input: 'equitas small.finance bank', output: 'equitas' }
  // ,
  // { input: 'equitas-small finance bank', output: 'equitas' }
  // ,
  // { input: 'equitas small finance-bank', output: 'equitas' }
  // ,
  // { input: 'esfb_r', output: 'equitas' }
  // ,
  // { input: 'equitas..small..finance..bank', output: 'equitas' }
  // ,
  // { input: 'equitas small__finance bank', output: 'equitas' }
  // ,
  // { input: 'equitas-small_finance-bank', output: 'equitas' }
  // ,
  // { input: 'equitas___small__finance__bank', output: 'equitas' }
  // ,
  // { input: 'esf_b__r', output: 'equitas' }
  // ,
  // { input: 'e-q.u_i.t.a.s.s.mal.lfinancebank', output: 'equitas' }
  // ,
  // { input: 'equitasbank', output: 'equitas' }
  // ,
  // { input: 'equit.as.small.finance.bank', output: 'equitas' }
  // ,
  // { input: 'equitas_small finance.bank', output: 'equitas' }
  // ,
  // { input: 'equitas_small-finance-bank', output: 'equitas' }
  // ,
  // { input: 'esf_b_r', output: 'equitas' }
  // ,
  // { input: 'equi-tas small finance bank', output: 'equitas' }
  // ,
  // { input: 'equitas_small__finance.bank', output: 'equitas' }
  // ,
  // { input: 'equitas smallfinance bank', output: 'equitas' }
  // ,
  // { input: 'equitas small.finance-bank', output: 'equitas' }
  // ,
  // { input: 'esf br', output: 'equitas' }
  // ,
  // { input: 'equitas_small finance_bank', output: 'equitas' }
  // ,
  // { input: 'equitas_small-finance bank', output: 'equitas' }
  // ,
  // { input: 'equitas-small_finance bank', output: 'equitas' }
  // ,
  // { input: 'equitas_small finance__bank', output: 'equitas' }
  // ,
  // { input: 'esf--br', output: 'equitas' }
  // ,
  // { input: 'equitas__small__finance bank', output: 'equitas' }
  // ,
  // { input: 'equitas-small finance--bank', output: 'equitas' }
  // ,
  // { input: 'equitas--small finance bank', output: 'equitas' }
  // ,
  // { input: 'equitas small--finance bank', output: 'equitas' }
  // ,
  // { input: 'es_f_b-r', output: 'equitas' }
  // ,
  // { input: 'equitas..small_finance.bank', output: 'equitas' }
  // ,
  // { input: 'equitas_small_finance.bank', output: 'equitas' }
  // ,
  // { input: 'equitas-small--finance-bank', output: 'equitas' }
  // ,
  // { input: 'equitas__small finance__bank', output: 'equitas' }
  // ,
  // { input: 'es.f_b__r', output: 'equitas' }
  // ,
  // { input: 'federal bank', output: 'federal' }
  // ,
  // { input: 'federal_bank', output: 'federal' }
  // ,
  // { input: 'federal.bank', output: 'federal' }
  // ,
  // { input: 'federal bank', output: 'federal' }
  // ,
  // { input: 'federal bank', output: 'federal' }
  // ,
  // { input: 'federal bank', output: 'federal' }
  // ,
  // { input: 'federal-bank', output: 'federal' }
  // ,
  // { input: 'federal bank', output: 'federal' }
  // ,
  // { input: 'federal bank', output: 'federal' }
  // ,
  // { input: 'federal bank', output: 'federal' }
  // ,
  // { input: 'federal-bank', output: 'federal' }
  // ,
  // { input: 'federal bank', output: 'federal' }
  // ,
  // { input: 'federal.bank', output: 'federal' }
  // ,
  // { input: 'federal bank', output: 'federal' }
  // ,
  // { input: 'federal,bank', output: 'federal' }
  // ,
  // { input: 'federal bank', output: 'federal' }
  // ,
  // { input: 'federal bank', output: 'federal' }
  // ,
  // { input: 'federal bank', output: 'federal' }
  // ,
  // { input: 'federal_bank', output: 'federal' }
  // ,
  // { input: 'federal bank', output: 'federal' }
  // ,
  // { input: 'federal.bank', output: 'federal' }
  // ,
  // { input: 'fabken', output: 'federal' }
  // ,
  // { input: 'fed.bank', output: 'federal' }
  // ,
  // { input: 'federalbnk', output: 'federal' }
  // ,
  // { input: 'federal_bank', output: 'federal' }
  // ,
  // { input: 'federal_bank', output: 'federal' }
  // ,
  // { input: 'federal_bank', output: 'federal' }
  // ,
  // { input: 'federal bank', output: 'federal' }
  // ,
  // { input: 'federal bank', output: 'federal' }
  // ,
  // { input: 'federal-bank', output: 'federal' }
  // ,
  // { input: 'federal bank', output: 'federal' }
  // ,
  // { input: 'federal.bank', output: 'federal' }
  // ,
  // { input: 'federal bank', output: 'federal' }
  // ,
  // { input: 'federal,bank', output: 'federal' }
  // ,
  // { input: 'federal bank', output: 'federal' }
  // ,
  // { input: 'federal bank', output: 'federal' }
  // ,
  // { input: 'federal bank', output: 'federal' }
  // ,
  // { input: 'federal_bank', output: 'federal' }
  // ,
  // { input: 'federal bank', output: 'federal' }
  // ,
  // { input: 'federal.bank', output: 'federal' }
  // ,
  // { input: 'hdfc', output: 'hdfc' }
  // ,
  // { input: 'hdfc bank', output: 'hdfc' }
  // ,
  // { input: 'hdfcr', output: 'hdfc' }
  // ,
  // { input: 'hdfcc', output: 'hdfc' }
  // ,
  // { input: 'hdf-c', output: 'hdfc' }
  // ,
  // { input: 'hdfc_', output: 'hdfc' }
  // ,
  // { input: 'hdfc.', output: 'hdfc' }
  // ,
  // { input: 'hdf c', output: 'hdfc' }
  // ,
  // { input: 'h-dfc', output: 'hdfc' }
  // ,
  // { input: 'hdf_c', output: 'hdfc' }
  // ,
  // { input: 'hdf.c', output: 'hdfc' }
  // ,
  // { input: 'hdf c ', output: 'hdfc' }
  // ,
  // { input: 'hdf_c ', output: 'hdfc' }
  // ,
  // { input: 'hdf.c ', output: 'hdfc' }
  // ,
  // { input: 'hd.fc', output: 'hdfc' }
  // ,
  // { input: 'hd_fc', output: 'hdfc' }
  // ,
  // { input: 'hd.fc_', output: 'hdfc' }
  // ,
  // { input: 'h_df c', output: 'hdfc' }
  // ,
  // { input: 'hdfc b_nk', output: 'hdfc' }
  // ,
  // { input: 'h.dfc b_nk', output: 'hdfc' }
  // ,
  // { input: 'hdfc .ank', output: 'hdfc' }
  // ,
  // { input: 'hdfc ban_', output: 'hdfc' }
  // ,
  // { input: 'hdfc bank', output: 'hdfc' }
  // ,
  // { input: 'h-dfcr', output: 'hdfc' }
  // ,
  // { input: 'hdf_cr', output: 'hdfc' }
  // ,
  // { input: 'hdfc_', output: 'hdfc' }
  // ,
  // { input: 'hdfc.', output: 'hdfc' }
  // ,
  // { input: 'h_dfcc', output: 'hdfc' }
  // ,
  // { input: 'hdf-cc', output: 'hdfc' }
  // ,
  // { input: 'hdf.c-c', output: 'hdfc' }
  // ,
  // { input: 'hdf c_c', output: 'hdfc' }
  // ,
  // { input: 'hdfc_ba_k', output: 'hdfc' }
  // ,
  // { input: 'hdfc ba_k', output: 'hdfc' }
  // ,
  // { input: 'hdfc ban_', output: 'hdfc' }
  // ,
  // { input: 'hdfc .ank', output: 'hdfc' }
  // ,
  // { input: 'hdf.c ban_', output: 'hdfc' }
  // ,
  // { input: 'hdfc bank', output: 'hdfc' }
  // ,
  // { input: 'h-dfcc', output: 'hdfc' }
  // ,
  // { input: 'hdfcc', output: 'hdfc' }
  // ,
  // { input: 'hdf.c_c', output: 'hdfc' }
  // ,
  // { input: '-icici', output: 'icici' }
  // ,
  // { input: 'icici_', output: 'icici' }
  // ,
  // { input: 'icici.', output: 'icici' }
  // ,
  // { input: 'icici ', output: 'icici' }
  // ,
  // { input: 'icicibank', output: 'icici' }
  // ,
  // { input: 'icici_bank', output: 'icici' }
  // ,
  // { input: 'icici.bank', output: 'icici' }
  // ,
  // { input: 'icici bank', output: 'icici' }
  // ,
  // { input: '_icici', output: 'icici' }
  // ,
  // { input: 'ciici', output: 'icici' }
  // ,
  // { input: 'iciic', output: 'icici' }
  // ,
  // { input: 'ci_ici', output: 'icici' }
  // ,
  // { input: 'cccici', output: 'icici' }
  // ,
  // { input: 'ic_cci', output: 'icici' }
  // ,
  // { input: 'icici-', output: 'icici' }
  // ,
  // { input: '-icici', output: 'icici' }
  // ,
  // { input: 'icici ', output: 'icici' }
  // ,
  // { input: 'icici.', output: 'icici' }
  // ,
  // { input: 'ici_ci', output: 'icici' }
  // ,
  // { input: 'inici', output: 'icici' }
  // ,
  // { input: 'icici_', output: 'icici' }
  // ,
  // { input: 'i-cici', output: 'icici' }
  // ,
  // { input: 'ici_ci', output: 'icici' }
  // ,
  // { input: 'icici.', output: 'icici' }
  // ,
  // { input: 'ici.ci', output: 'icici' }
  // ,
  // { input: 'icici', output: 'icici' }
  // ,
  // { input: 'ici_ci', output: 'icici' }
  // ,
  // { input: 'icici', output: 'icici' }
  // ,
  // { input: 'icici.', output: 'icici' }
  // ,
  // { input: 'ici_ci', output: 'icici' }
  // ,
  // { input: '-icici', output: 'icici' }
  // ,
  // { input: 'icici', output: 'icici' }
  // ,
  // { input: 'icci', output: 'icici' }
  // ,
  // { input: 'icic', output: 'icici' }
  // ,
  // { input: 'icici', output: 'icici' }
  // ,
  // { input: 'ici c i', output: 'icici' }
  // ,
  // { input: 'ci-ci', output: 'icici' }
  // ,
  // { input: '_icici', output: 'icici' }
  // ,
  // { input: 'i-ci_ci', output: 'icici' }
  // ,
  // { input: 'ici_ci', output: 'icici' }
  // ,
  // { input: 'idfc', output: 'idfc' }
  // ,
  // { input: 'i_dfc', output: 'idfc' }
  // ,
  // { input: 'idfc_', output: 'idfc' }
  // ,
  // { input: 'idfc.', output: 'idfc' }
  // ,
  // { input: 'idfc bank', output: 'idfc' }
  // ,
  // { input: 'i_dfc bank', output: 'idfc' }
  // ,
  // { input: 'idfc_ bank', output: 'idfc' }
  // ,
  // { input: 'idfc. bank', output: 'idfc' }
  // ,
  // { input: 'idfc first bank', output: 'idfc' }
  // ,
  // { input: 'i_dfc first bank', output: 'idfc' }
  // ,
  // { input: 'idfc_ first bank', output: 'idfc' }
  // ,
  // { input: 'idfc. first bank', output: 'idfc' }
  // ,
  // { input: 'idfbr', output: 'idfc' }
  // ,
  // { input: 'i_dfbr', output: 'idfc' }
  // ,
  // { input: 'idf_br', output: 'idfc' }
  // ,
  // { input: 'idf.r', output: 'idfc' }
  // ,
  // { input: 'indian', output: 'indian' }
  // ,
  // { input: 'indian-bank', output: 'indian' }
  // ,
  // { input: 'indian.bank', output: 'indian' }
  // ,
  // { input: 'indian bank', output: 'indian' }
  // ,
  // { input: 'i_ndian', output: 'indian' }
  // ,
  // { input: 'indian bank_', output: 'indian' }
  // ,
  // { input: 'i.d.i.a.n', output: 'indian' }
  // ,
  // { input: 'indian__', output: 'indian' }
  // ,
  // { input: 'indi-an', output: 'indian' }
  // ,
  // { input: 'idibr', output: 'indian' }
  // ,
  // { input: 'idi_br', output: 'indian' }
  // ,
  // { input: 'idibr.', output: 'indian' }
  // ,
  // { input: 'idibr_', output: 'indian' }
  // ,
  // { input: 'i di br', output: 'indian' }
  // ,
  // { input: 'idibr_', output: 'indian' }
  // ,
  // { input: 'idibr.', output: 'indian' }
  // ,
  // { input: 'i-di_br', output: 'indian' }
  // ,
  // { input: 'idibr', output: 'indian' }
  // ,
  // { input: 'idibr_', output: 'indian' }
  // ,
  // { input: 'idibr', output: 'indian' }
  // ,
  // { input: 'idibr', output: 'indian' }
  // ,
  // { input: 'idibr', output: 'indian' }
  // ,
  // { input: 'idibr', output: 'indian' }
  // ,
  // { input: 'idibr', output: 'indian' }
  // ,
  // { input: 'idibr', output: 'indian' }
  // ,
  // { input: 'idibr', output: 'indian' }
  // ,
  // { input: 'idibr', output: 'indian' }
  // ,
  // { input: 'idibr', output: 'indian' }
  // ,
  // { input: 'idibr', output: 'indian' }
  // ,
  // { input: 'idibr', output: 'indian' }
  // ,
  // { input: 'idibr', output: 'indian' }
  // ,
  // { input: 'idibr', output: 'indian' }
  // ,
  // { input: 'idibr', output: 'indian' }
  // ,
  // { input: 'idibr', output: 'indian' }
  // ,
  // { input: 'idibr', output: 'indian' }
  // ,
  // { input: 'idibr', output: 'indian' }
  // ,
  // { input: 'idibr', output: 'indian' }
  // ,
  // { input: 'idibr', output: 'indian' }
  // ,
  // { input: 'indusind', output: 'indusind' }
  // ,
  // { input: 'indusind-bank', output: 'indusind' }
  // ,
  // { input: 'indusind_bank', output: 'indusind' }
  // ,
  // { input: 'indusind bank', output: 'indusind' }
  // ,
  // { input: 'indusind.', output: 'indusind' }
  // ,
  // { input: 'indusind ', output: 'indusind' }
  // ,
  // { input: 'indusind_b', output: 'indusind' }
  // ,
  // { input: 'indusindb', output: 'indusind' }
  // ,
  // { input: 'indusind_b', output: 'indusind' }
  // ,
  // { input: 'indusind-4', output: 'indusind' }
  // ,
  // { input: 'indusind_7', output: 'indusind' }
  // ,
  // { input: 'indusind.8', output: 'indusind' }
  // ,
  // { input: 'indusind 9', output: 'indusind' }
  // ,
  // { input: 'indusind&', output: 'indusind' }
  // ,
  // { input: '-indusind', output: 'indusind' }
  // ,
  // { input: '_indusind', output: 'indusind' }
  // ,
  // { input: '.indusind', output: 'indusind' }
  // ,
  // { input: ' indusind', output: 'indusind' }
  // ,
  // { input: 'aindusind', output: 'indusind' }
  // ,
  // { input: 'indusindc', output: 'indusind' }
  // ,
  // { input: 'i_n_d_u_s_i_n_d', output: 'indusind' }
  // ,
  // { input: 'i-n-d-u-s-i-n-d', output: 'indusind' }
  // ,
  // { input: 'i.n.d.u.s.i.n.d', output: 'indusind' }
  // ,
  // { input: 'i d u s i n d', output: 'indusind' }
  // ,
  // { input: 'id nusfd', output: 'indusind' }
  // ,
  // { input: 'indus  ind', output: 'indusind' }
  // ,
  // { input: 'indusi-nd', output: 'indusind' }
  // ,
  // { input: 'indusind  ', output: 'indusind' }
  // ,
  // { input: 'indusindd', output: 'indusind' }
  // ,
  // { input: 'n d u s i n d', output: 'indusind' }
  // ,
  // { input: 'ind usi nd', output: 'indusind' }
  // ,
  // { input: 'indusin-d', output: 'indusind' }
  // ,
  // { input: 'iusind', output: 'indusind' }
  // ,
  // { input: 'indusi-nd', output: 'indusind' }
  // ,
  // { input: 'n.dusin_', output: 'indusind' }
  // ,
  // { input: 'in dusind', output: 'indusind' }
  // ,
  // { input: 'indus ind', output: 'indusind' }
  // ,
  // { input: 'i_du_ind', output: 'indusind' }
  // ,
  // { input: 'indus.ind', output: 'indusind' }
  // ,
  // { input: 'in_dusind', output: 'indusind' }
  // ,
  // { input: 'ind_u_sind_', output: 'indusind' }
  // ,
  // { input: 'iob', output: 'iob' }
  // ,
  // { input: 'io-b', output: 'iob' }
  // ,
  // { input: 'io_b', output: 'iob' }
  // ,
  // { input: 'io.b', output: 'iob' }
  // ,
  // { input: 'io b', output: 'iob' }
  // ,
  // { input: 'iob bank', output: 'iob' }
  // ,
  // { input: 'iob_bank', output: 'iob' }
  // ,
  // { input: 'iob.bank', output: 'iob' }
  // ,
  // { input: 'iob bank', output: 'iob' }
  // ,
  // { input: 'iob bank', output: 'iob' }
  // ,
  // { input: 'indian overseas bank', output: 'iob' }
  // ,
  // { input: 'indian_overseas_bank', output: 'iob' }
  // ,
  // { input: 'indian.overseas.bank', output: 'iob' }
  // ,
  // { input: 'indian overseas bank', output: 'iob' }
  // ,
  // { input: 'indian overseas bank', output: 'iob' }
  // ,
  // { input: 'indian overseas bank', output: 'iob' }
  // ,
  // { input: 'iobar', output: 'iob' }
  // ,
  // { input: 'io-bar', output: 'iob' }
  // ,
  // { input: 'io_bar', output: 'iob' }
  // ,
  // { input: 'io.bar', output: 'iob' }
  // ,
  // { input: 'io bar', output: 'iob' }
  // ,
  // { input: 'iobc', output: 'iobc' }
  // ,
  // { input: 'io-c', output: 'iobc' }
  // ,
  // { input: 'iob.c', output: 'iobc' }
  // ,
  // { input: ' iobc', output: 'iobc' }
  // ,
  // { input: 'iobc_', output: 'iobc' }
  // ,
  // { input: 'iob corporate', output: 'iobc' }
  // ,
  // { input: 'io_corporate', output: 'iobc' }
  // ,
  // { input: 'iob.corporate', output: 'iobc' }
  // ,
  // { input: ' iob corporate', output: 'iobc' }
  // ,
  // { input: 'iobc__orporate', output: 'iobc' }
  // ,
  // { input: 'indian overseas corporate', output: 'iobc' }
  // ,
  // { input: 'indian_overseas corporate', output: 'iobc' }
  // ,
  // { input: 'indian.overseas corporate', output: 'iobc' }
  // ,
  // { input: 'indian overseas corporate', output: 'iobc' }
  // ,
  // { input: 'i ndian overseas corporate', output: 'iobc' }
  // ,
  // { input: 'indian overseas bank corporate', output: 'iobc' }
  // ,
  // { input: 'indian_overseas_bank corporate', output: 'iobc' }
  // ,
  // { input: 'indian.overseas.bank corporate', output: 'iobc' }
  // ,
  // { input: 'indian overseas bank corporate', output: 'iobc' }
  // ,
  // { input: 'indian_overseas.bank_corporate', output: 'iobc' }
  // ,
  // { input: 'iobac', output: 'iobc' }
  // ,
  // { input: 'io-ac', output: 'iobc' }
  // ,
  // { input: 'iob.ac', output: 'iobc' }
  // ,
  // { input: ' iobac', output: 'iobc' }
  // ,
  // { input: 'iobac_', output: 'iobc' }
  // ,
  // { input: 'j_kb', output: 'jkb' }
  // ,
  // { input: 'jammu & kashmir bank', output: 'jkb' }
  // ,
  // { input: 'jammu_and_kashmir_bank', output: 'jkb' }
  // ,
  // { input: 'j k bank', output: 'jkb' }
  // ,
  // { input: 'jkb', output: 'jkb' }
  // ,
  // { input: 'j_kb', output: 'jkb' }
  // ,
  // { input: 'j  bank', output: 'jkb' }
  // ,
  // { input: 'ja_mu & kashmir bank', output: 'jkb' }
  // ,
  // { input: 'j_k bank', output: 'jkb' }
  // ,
  // { input: 'jammu & kashmir bank', output: 'jkb' }
  // ,
  // { input: 'jammu an_kashmir bank', output: 'jkb' }
  // ,
  // { input: 'jkb', output: 'jkb' }
  // ,
  // { input: 'ju&k bank', output: 'jkb' }
  // ,
  // { input: 'j__k bank', output: 'jkb' }
  // ,
  // { input: 'jammu and kashmir bank', output: 'jkb' }
  // ,
  // { input: 'jakar', output: 'jkb' }
  // ,
  // { input: 'jakar', output: 'jkb' }
  // ,
  // { input: 'jammu and kashmir bank', output: 'jkb' }
  // ,
  // { input: 'jammukashmir bank', output: 'jkb' }
  // ,
  // { input: 'jammu.kashmir bank', output: 'jkb' }
  // ,
  // { input: 'jammu and kashmir bank', output: 'jkb' }
  // ,
  // { input: 'j_k bank', output: 'jkb' }
  // ,
  // { input: 'j_kb', output: 'jkb' }
  // ,
  // { input: 'j k bank', output: 'jkb' }
  // ,
  // { input: 'jammu kashmir bank', output: 'jkb' }
  // ,
  // { input: 'jammu_kashmir bank', output: 'jkb' }
  // ,
  // { input: 'j+k bank', output: 'jkb' }
  // ,
  // { input: 'jammu kashmir bank', output: 'jkb' }
  // ,
  // { input: 'jammu bank', output: 'jkb' }
  // ,
  // { input: 'j.k.bank', output: 'jkb' }
  // ,
  // { input: 'jammu and kashmir bank', output: 'jkb' }
  // ,
  // { input: 'jmu k bank', output: 'jkb' }
  // ,
  // { input: 'j_nk bank', output: 'jkb' }
  // ,
  // { input: 'j ak bank', output: 'jkb' }
  // ,
  // { input: 'jammu_kashmir bank', output: 'jkb' }
  // ,
  // { input: 'jammu.kashmir bank', output: 'jkb' }
  // ,
  // { input: 'j k bank', output: 'jkb' }
  // ,
  // { input: 'jkb', output: 'jkb' }
  // ,
  // { input: 'j_k bank', output: 'jkb' }
  // ,
  // { input: 'karnataka', output: 'karnatka' }
  // ,
  // { input: 'k_a_r_n_a_t_a_k_a', output: 'karnatka' }
  // ,
  // { input: 'k.a.r.n.a.t.a.k.a', output: 'karnatka' }
  // ,
  // { input: 'karnataka_ban_k', output: 'karnatka' }
  // ,
  // { input: 'karbr', output: 'karnatka' }
  // ,
  // { input: 'karur', output: 'karur' }
  // ,
  // { input: 'karur_bank', output: 'karur' }
  // ,
  // { input: 'karur.vysya_bank', output: 'karur' }
  // ,
  // { input: 'karur.vysya', output: 'karur' }
  // ,
  // { input: 'karur_vysya_bank', output: 'karur' }
  // ,
  // { input: 'karur-vysya', output: 'karur' }
  // ,
  // { input: 'karur bank', output: 'karur' }
  // ,
  // { input: 'karur.bank', output: 'karur' }
  // ,
  // { input: 'karur vysya bank', output: 'karur' }
  // ,
  // { input: 'karur_vysya', output: 'karur' }
  // ,
  // { input: 'karur vysya', output: 'karur' }
  // ,
  // { input: 'k_a_r_u_r', output: 'karur' }
  // ,
  // { input: 'kvblr', output: 'karur' }
  // ,
  // { input: 'k_v_b_l_r', output: 'karur' }
  // ,
  // { input: 'k-v-b-l-r', output: 'karur' }
  // ,
  // { input: 'k.v.b.l.r', output: 'karur' }
  // ,
  // { input: 'kvblr_', output: 'karur' }
  // ,
  // { input: 'kvblr ', output: 'karur' }
  // ,
  // { input: 'karur_', output: 'karur' }
  // ,
  // { input: 'karur-', output: 'karur' }
  // ,
  // { input: 'karur.', output: 'karur' }
  // ,
  // { input: 'karur ', output: 'karur' }
  // ,
  // { input: 'kvblr_bank', output: 'karur' }
  // ,
  // { input: 'kvblr_vysya_bank', output: 'karur' }
  // ,
  // { input: 'kvblr.vysya_bank', output: 'karur' }
  // ,
  // { input: 'kvblr.vysya', output: 'karur' }
  // ,
  // { input: 'kvblr_vysya_bank', output: 'karur' }
  // ,
  // { input: 'kvblr-vysya', output: 'karur' }
  // ,
  // { input: 'kvblr bank', output: 'karur' }
  // ,
  // { input: 'kvblr.bank', output: 'karur' }
  // ,
  // { input: 'kvblr vysya bank', output: 'karur' }
  // ,
  // { input: 'kvblr_vysya', output: 'karur' }
  // ,
  // { input: 'kvblr vysya', output: 'karur' }
  // ,
  // { input: 'k_v_b_l_r_bank', output: 'karur' }
  // ,
  // { input: 'k.v.b.l.r.bank', output: 'karur' }
  // ,
  // { input: 'k-v-b-l-r-bank', output: 'karur' }
  // ,
  // { input: 'k_v_b_l_r_vysya_bank', output: 'karur' }
  // ,
  // { input: 'k.v.b.l.r.vysya', output: 'karur' }
  // ,
  // { input: 'k-v-b-l-r.vysya', output: 'karur' }
  // ,
  // { input: 'kotak', output: 'kotak' }
  // ,
  // { input: 'kotak bank', output: 'kotak' }
  // ,
  // { input: 'kotak_bank', output: 'kotak' }
  // ,
  // { input: 'kotak.bank', output: 'kotak' }
  // ,
  // { input: 'kotak_bank', output: 'kotak' }
  // ,
  // { input: 'kotak bank', output: 'kotak' }
  // ,
  // { input: 'kotak bank.', output: 'kotak' }
  // ,
  // { input: 'kotak bank', output: 'kotak' }
  // ,
  // { input: 'kotak bank_', output: 'kotak' }
  // ,
  // { input: 'kotak.', output: 'kotak' }
  // ,
  // { input: 'kotak_bank', output: 'kotak' }
  // ,
  // { input: 'kotak_bank', output: 'kotak' }
  // ,
  // { input: 'k.kbank', output: 'kotak' }
  // ,
  // { input: 'kotak', output: 'kotak' }
  // ,
  // { input: 'kotak', output: 'kotak' }
  // ,
  // { input: 'kotak', output: 'kotak' }
  // ,
  // { input: 'kotak.__', output: 'kotak' }
  // ,
  // { input: '___kotak', output: 'kotak' }
  // ,
  // { input: 'kotak_bank', output: 'kotak' }
  // ,
  // { input: 'kotak.bank_', output: 'kotak' }
  // ,
  // { input: 'kotak.bank', output: 'kotak' }
  // ,
  // { input: 'kotak_bank', output: 'kotak' }
  // ,
  // { input: 'kotak bank', output: 'kotak' }
  // ,
  // { input: 'kotak bank', output: 'kotak' }
  // ,
  // { input: 'kotak', output: 'kotak' }
  // ,
  // { input: 'kotak bank.', output: 'kotak' }
  // ,
  // { input: 'kot.k bank', output: 'kotak' }
  // ,
  // { input: 'kotak', output: 'kotak' }
  // ,
  // { input: 'bank -kotak', output: 'kotak' }
  // ,
  // { input: 'kotak_ban_k', output: 'kotak' }
  // ,
  // { input: 'kotak', output: 'kotak' }
  // ,
  // { input: 'kotak bank', output: 'kotak' }
  // ,
  // { input: 'kotak bank', output: 'kotak' }
  // ,
  // { input: 'kotak bank.', output: 'kotak' }
  // ,
  // { input: 'kotak', output: 'kotak' }
  // ,
  // { input: 'kotak bank..', output: 'kotak' }
  // ,
  // { input: 'kotak bank', output: 'kotak' }
  // ,
  // { input: '_kotak', output: 'kotak' }
  // ,
  // { input: 'kotak bank', output: 'kotak' }
  // ,
  // { input: 'lvbc', output: 'lvbc' }
  // ,
  // { input: 'lvb corporate', output: 'lvbc' }
  // ,
  // { input: 'l-vb.c', output: 'lvbc' }
  // ,
  // { input: 'lv b_c', output: 'lvbc' }
  // ,
  // { input: 'l_vb.c', output: 'lvbc' }
  // ,
  // { input: 'la-vbc', output: 'lvbc' }
  // ,
  // { input: 'l vbc', output: 'lvbc' }
  // ,
  // { input: 'lv.b_c', output: 'lvbc' }
  // ,
  // { input: 'lab c', output: 'lvbc' }
  // ,
  // { input: 'l_vbc', output: 'lvbc' }
  // ,
  // { input: 'lvbc', output: 'lvbc' }
  // ,
  // { input: 'lvb corporate', output: 'lvbc' }
  // ,
  // { input: 'l-vb.c', output: 'lvbc' }
  // ,
  // { input: 'lv b_c', output: 'lvbc' }
  // ,
  // { input: 'l_vb.c', output: 'lvbc' }
  // ,
  // { input: 'la-vbc', output: 'lvbc' }
  // ,
  // { input: 'l vbc', output: 'lvbc' }
  // ,
  // { input: 'lv.b_c', output: 'lvbc' }
  // ,
  // { input: 'lab c', output: 'lvbc' }
  // ,
  // { input: 'l_vbc', output: 'lvbc' }
  // ,
  // { input: 'lvbc', output: 'lvbc' }
  // ,
  // { input: 'lvb corporate', output: 'lvbc' }
  // ,
  // { input: 'l-vb.c', output: 'lvbc' }
  // ,
  // { input: 'lv b_c', output: 'lvbc' }
  // ,
  // { input: 'l_vb.c', output: 'lvbc' }
  // ,
  // { input: 'la-vbc', output: 'lvbc' }
  // ,
  // { input: 'l vbc', output: 'lvbc' }
  // ,
  // { input: 'lv.b_c', output: 'lvbc' }
  // ,
  // { input: 'lab c', output: 'lvbc' }
  // ,
  // { input: 'l_vbc', output: 'lvbc' }
  // ,
  // { input: 'lvbc', output: 'lvbc' }
  // ,
  // { input: 'lvb corporate', output: 'lvbc' }
  // ,
  // { input: 'l-vb.c', output: 'lvbc' }
  // ,
  // { input: 'lv b_c', output: 'lvbc' }
  // ,
  // { input: 'l_vb.c', output: 'lvbc' }
  // ,
  // { input: 'la-vbc', output: 'lvbc' }
  // ,
  // { input: 'l vbc', output: 'lvbc' }
  // ,
  // { input: 'lv.b_c', output: 'lvbc' }
  // ,
  // { input: 'lab c', output: 'lvbc' }
  // ,
  // { input: 'l_vbc', output: 'lvbc' }
  // ,
  // { input: 'axisc', output: 'axisc' }
  // ,
  // { input: 'axi-c', output: 'axisc' }
  // ,
  // { input: 'axi_c', output: 'axisc' }
  // ,
  // { input: 'axi.c', output: 'axisc' }
  // ,
  // { input: 'axisc ', output: 'axisc' }
  // ,
  // { input: 'axis corporate', output: 'axisc' }
  // ,
  // { input: 'axis_corporate', output: 'axisc' }
  // ,
  // { input: 'axis.corporate', output: 'axisc' }
  // ,
  // { input: 'axiscorporate', output: 'axisc' }
  // ,
  // { input: 'utibc', output: 'axisc' }
  // ,
  // { input: 'uti-c', output: 'axisc' }
  // ,
  // { input: 'uti_c', output: 'axisc' }
  // ,
  // { input: 'uti.c', output: 'axisc' }
  // ,
  // { input: 'utibc ', output: 'axisc' }
  // ,
  // { input: 'utib corporate', output: 'axisc' }
  // ,
  // { input: 'utib_corporate', output: 'axisc' }
  // ,
  // { input: 'utib.corporate', output: 'axisc' }
  // ,
  // { input: 'utibcorporate', output: 'axisc' }
  // ,
  // { input: 'bandhan bank', output: 'bdnc' }
  // ,
  // { input: 'bandh_n bank', output: 'bdnc' }
  // ,
  // { input: 'bandhan bank', output: 'bdnc' }
  // ,
  // { input: 'bandha. bank', output: 'bdnc' }
  // ,
  // { input: 'bandhan  bank', output: 'bdnc' }
  // ,
  // { input: 'ban_han bank', output: 'bdnc' }
  // ,
  // { input: 'bandh_n', output: 'bdnc' }
  // ,
  // { input: 'bandh_n', output: 'bdnc' }
  // ,
  // { input: 'bandhan', output: 'bdnc' }
  // ,
  // { input: 'bandhan', output: 'bdnc' }
  // ,
  // { input: 'bdnc', output: 'bdnc' }
  // ,
  // { input: 'bdnc', output: 'bdnc' }
  // ,
  // { input: 'bandha_ corporate', output: 'bdnc' }
  // ,
  // { input: 'bandha. corporate', output: 'bdnc' }
  // ,
  // { input: 'bandhan corporate', output: 'bdnc' }
  // ,
  // { input: 'bandha_ corporate', output: 'bdnc' }
  // ,
  // { input: 'bandha_ corporate', output: 'bdnc' }
  // ,
  // { input: 'b_ndhan corporate', output: 'bdnc' }
  // ,
  // { input: 'bandha_ corporate', output: 'bdnc' }
  // ,
  // { input: 'bandha_ corporate', output: 'bdnc' }
  // ,
  // { input: 'bdblc', output: 'bdnc' }
  // ,
  // { input: 'bdblc', output: 'bdnc' }
  // ,
  // { input: 'bandh_n corporate', output: 'bdnc' }
  // ,
  // { input: 'bandh_n corporate', output: 'bdnc' }
  // ,
  // { input: 'bandhan corporate', output: 'bdnc' }
  // ,
  // { input: 'bandha. corporate', output: 'bdnc' }
  // ,
  // { input: 'bandhan corporate', output: 'bdnc' }
  // ,
  // { input: 'ba_dh_n corporate', output: 'bdnc' }
  // ,
  // { input: 'bandhan corporate', output: 'bdnc' }
  // ,
  // { input: 'bandhan corporate', output: 'bdnc' }
  // ,
  // { input: 'bandh_n bank', output: 'bdnc' }
  // ,
  // { input: 'bandhan bank', output: 'bdnc' }
  // ,
  // { input: 'bandhan bank', output: 'bdnc' }
  // ,
  // { input: 'bandhan bank', output: 'bdnc' }
  // ,
  // { input: 'band_h_n bank', output: 'bdnc' }
  // ,
  // { input: 'bandhan bank', output: 'bdnc' }
  // ,
  // { input: 'bandhan bank', output: 'bdnc' }
  // ,
  // { input: 'bandhan bank', output: 'bdnc' }
  // ,
  // { input: 'bdnr', output: 'bdnr' }
  // ,
  // { input: 'bd_nr', output: 'bdnr' }
  // ,
  // { input: 'b.dnr', output: 'bdnr' }
  // ,
  // { input: 'ban_dr han retail', output: 'bdnr' }
  // ,
  // { input: 'bdblr', output: 'bdnr' }
  // ,
  // { input: 'bdblr', output: 'bdnr' }
  // ,
  // { input: 'bd-blr', output: 'bdnr' }
  // ,
  // { input: 'b dr', output: 'bdnr' }
  // ,
  // { input: 'bandhan retail', output: 'bdnr' }
  // ,
  // { input: 'bandhan re_tail', output: 'bdnr' }
  // ,
  // { input: 'bandhan r.etail', output: 'bdnr' }
  // ,
  // { input: 'bandhanretail', output: 'bdnr' }
  // ,
  // { input: 'bandhan_retail', output: 'bdnr' }
  // ,
  // { input: 'bandhan.retail', output: 'bdnr' }
  // ,
  // { input: 'b_andhan retail', output: 'bdnr' }
  // ,
  // { input: 'ban-dhan retail', output: 'bdnr' }
  // ,
  // { input: 'bandhan retail', output: 'bdnr' }
  // ,
  // { input: 'bandhan _retail', output: 'bdnr' }
  // ,
  // { input: 'bandhan. retail', output: 'bdnr' }
  // ,
  // { input: 'bandhan retail', output: 'bdnr' }
  // ,
  // { input: 'bandhan re tail', output: 'bdnr' }
  // ,
  // { input: 'bandhan re.tail', output: 'bdnr' }
  // ,
  // { input: 'bandhan retail', output: 'bdnr' }
  // ,
  // { input: 'bandhan_retail', output: 'bdnr' }
  // ,
  // { input: 'bandhan.retail', output: 'bdnr' }
  // ,
  // { input: 'bandhan retail', output: 'bdnr' }
  // ,
  // { input: 'bandhan_re tail', output: 'bdnr' }
  // ,
  // { input: 'bandhan.re_tail', output: 'bdnr' }
  // ,
  // { input: '_bdnr', output: 'bdnr' }
  // ,
  // { input: '-bdnr', output: 'bdnr' }
  // ,
  // { input: '.bdnr', output: 'bdnr' }
  // ,
  // { input: 'bdnr', output: 'bdnr' }
  // ,
  // { input: 'bd-nr', output: 'bdnr' }
  // ,
  // { input: 'bd.nr', output: 'bdnr' }
  // ,
  // { input: 'bn_dr', output: 'bdnr' }
  // ,
  // { input: 'b_dblr', output: 'bdnr' }
  // ,
  // { input: 'bdblr_', output: 'bdnr' }
  // ,
  // { input: 'bdblr-', output: 'bdnr' }
  // ,
  // { input: 'bdblr.', output: 'bdnr' }
  // ,
  // { input: 'bd', output: 'bdnr' }
  // ,
  // { input: 'bo-c', output: 'bobc' }
  // ,
  // { input: 'b_o_c', output: 'bobc' }
  // ,
  // { input: '.bobc', output: 'bobc' }
  // ,
  // { input: 'ban_k_of_baroda', output: 'bobc' }
  // ,
  // { input: 'ba.nk_of_baroda', output: 'bobc' }
  // ,
  // { input: 'bank.of.baroda', output: 'bobc' }
  // ,
  // { input: 'bar b c', output: 'bobc' }
  // ,
  // { input: 'bar_bc', output: 'bobc' }
  // ,
  // { input: 'barbc', output: 'bobc' }
  // ,
  // { input: 'bo_c', output: 'bobc' }
  // ,
  // { input: 'b_o-c', output: 'bobc' }
  // ,
  // { input: '.bobc', output: 'bobc' }
  // ,
  // { input: 'ban_k_of_baroda', output: 'bobc' }
  // ,
  // { input: 'ba.nk_of_baroda', output: 'bobc' }
  // ,
  // { input: 'bank.of.baroda', output: 'bobc' }
  // ,
  // { input: 'bar b c', output: 'bobc' }
  // ,
  // { input: 'bar_bc', output: 'bobc' }
  // ,
  // { input: 'barbc', output: 'bobc' }
  // ,
  // { input: 'bo-c', output: 'bobc' }
  // ,
  // { input: 'b_o_c', output: 'bobc' }
  // ,
  // { input: '.bobc', output: 'bobc' }
  // ,
  // { input: 'ban_k_of_baroda', output: 'bobc' }
  // ,
  // { input: 'ba.nk_of_baroda', output: 'bobc' }
  // ,
  // { input: 'bank.of.baroda', output: 'bobc' }
  // ,
  // { input: 'boi', output: 'boi' }
  // ,
  // { input: 'bank of india', output: 'boi' }
  // ,
  // { input: 'bkidr', output: 'boi' }
  // ,
  // { input: 'bkidc', output: 'boi' }
  // ,
  // { input: 'b_nk of indi_', output: 'boi' }
  // ,
  // { input: 'ban. of india', output: 'boi' }
  // ,
  // { input: 'bkid_', output: 'boi' }
  // ,
  // { input: 'bnk_of_india', output: 'boi' }
  // ,
  // { input: 'b__i', output: 'boi' }
  // ,
  // { input: 'bank_of. india', output: 'boi' }
  // ,
  // { input: 'b_kid_', output: 'boi' }
  // ,
  // { input: '.ank of india', output: 'boi' }
  // ,
  // { input: 'b__dr', output: 'boi' }
  // ,
  // { input: 'bank. of india', output: 'boi' }
  // ,
  // { input: 'b_i', output: 'boi' }
  // ,
  // { input: 'bank of india_', output: 'boi' }
  // ,
  // { input: 'bki_c', output: 'boi' }
  // ,
  // { input: 'ban_ of india', output: 'boi' }
  // ,
  // { input: 'ba_k of india', output: 'boi' }
  // ,
  // { input: 'b_ki_r', output: 'boi' }
  // ,
  // { input: '.o_', output: 'boi' }
  // ,
  // { input: 'b_k_id_', output: 'boi' }
  // ,
  // { input: 'bank o_ ind_a', output: 'boi' }
  // ,
  // { input: 'b_kid_', output: 'boi' }
  // ,
  // { input: 'ba_k_of india', output: 'boi' }
  // ,
  // { input: 'ba__', output: 'boi' }
  // ,
  // { input: 'ba__k of india', output: 'boi' }
  // ,
  // { input: 'ba_k of. india', output: 'boi' }
  // ,
  // { input: 'b_nk of in_i_', output: 'boi' }
  // ,
  // { input: 'bank_. of india', output: 'boi' }
  // ,
  // { input: 'bn_ of india', output: 'boi' }
  // ,
  // { input: 'b_ki_c', output: 'boi' }
  // ,
  // { input: 'b_nk_ of india', output: 'boi' }
  // ,
  // { input: 'ban_ of in_ia', output: 'boi' }
  // ,
  // { input: '.ank of ind_a', output: 'boi' }
  // ,
  // { input: '_ank of india', output: 'boi' }
  // ,
  // { input: 'ba_k of in_ia', output: 'boi' }
  // ,
  // { input: 'b_k_d_', output: 'boi' }
  // ,
  // { input: 'bom', output: 'bom' }
  // ,
  // { input: 'ba_nk of maharashtra', output: 'bom' }
  // ,
  // { input: 'mah.r', output: 'bom' }
  // ,
  // { input: 'ban-k_of_maharashtra', output: 'bom' }
  // ,
  // { input: 'ba nk of maharashtra', output: 'bom' }
  // ,
  // { input: 'b_om', output: 'bom' }
  // ,
  // { input: 'maharashtra', output: 'bom' }
  // ,
  // { input: 'bom', output: 'bom' }
  // ,
  // { input: 'ba nk_of_maharashtra', output: 'bom' }
  // ,
  // { input: 'maharashtra', output: 'bom' }
  // ,
  // { input: 'ban-k_of maharashtra', output: 'bom' }
  // ,
  // { input: 'maharashtra', output: 'bom' }
  // ,
  // { input: 'ba nk_of_maharashtra', output: 'bom' }
  // ,
  // { input: 'bom', output: 'bom' }
  // ,
  // { input: 'maharashtra', output: 'bom' }
  // ,
  // { input: 'bom', output: 'bom' }
  // ,
  // { input: 'mah.r', output: 'bom' }
  // ,
  // { input: 'ba nk_of maharashtra', output: 'bom' }
  // ,
  // { input: 'bank of maharashtra', output: 'bom' }
  // ,
  // { input: 'maharashtra', output: 'bom' }
  // ,
  // { input: 'ba_nk of maharashtra', output: 'bom' }
  // ,
  // { input: 'ban-k of maharashtra', output: 'bom' }
  // ,
  // { input: 'ba nk_of_maharashtra', output: 'bom' }
  // ,
  // { input: 'bom', output: 'bom' }
  // ,
  // { input: 'maharashtra', output: 'bom' }
  // ,
  // { input: 'maharashtra', output: 'bom' }
  // ,
  // { input: 'ba-nk of maharashtra', output: 'bom' }
  // ,
  // { input: 'ba_nk_of maharashtra', output: 'bom' }
  // ,
  // { input: 'bom', output: 'bom' }
  // ,
  // { input: 'bank_of maharashtra', output: 'bom' }
  // ,
  // { input: 'maharashtra', output: 'bom' }
  // ,
  // { input: 'b_om', output: 'bom' }
  // ,
  // { input: 'maharashtra', output: 'bom' }
  // ,
  // { input: 'ba nk of maharashtra', output: 'bom' }
  // ,
  // { input: 'ba-nk of maharashtra', output: 'bom' }
  // ,
  // { input: 'bank_of_maharashtra', output: 'bom' }
  // ,
  // { input: 'ba nk of maharashtra', output: 'bom' }
  // ,
  // { input: 'maharashtra', output: 'bom' }
  // ,
  // { input: 'bank of maharashtra', output: 'bom' }
  // ,
  // { input: 'canara', output: 'canara' }
  // ,
  // { input: 'canara bank', output: 'canara' }
  // ,
  // { input: 'cnrbr', output: 'canara' }
  // ,
  // { input: 'canara.', output: 'canara' }
  // ,
  // { input: 'canara-bank', output: 'canara' }
  // ,
  // { input: 'canara_bank', output: 'canara' }
  // ,
  // { input: 'canara bank.', output: 'canara' }
  // ,
  // { input: 'canara.bank', output: 'canara' }
  // ,
  // { input: 'c a n a r a', output: 'canara' }
  // ,
  // { input: 'can_ara', output: 'canara' }
  // ,
  // { input: 'canara.bank', output: 'canara' }
  // ,
  // { input: 'canara bank', output: 'canara' }
  // ,
  // { input: 'canara_bank', output: 'canara' }
  // ,
  // { input: 'canara', output: 'canara' }
  // ,
  // { input: 'canara_bank', output: 'canara' }
  // ,
  // { input: 'canara bank', output: 'canara' }
  // ,
  // { input: 'canara!', output: 'canara' }
  // ,
  // { input: 'canara', output: 'canara' }
  // ,
  // { input: 'canara bank!', output: 'canara' }
  // ,
  // { input: 'canara', output: 'canara' }
  // ,
  // { input: 'canara - bank', output: 'canara' }
  // ,
  // { input: 'canara', output: 'canara' }
  // ,
  // { input: 'canara -bank', output: 'canara' }
  // ,
  // { input: 'canara', output: 'canara' }
  // ,
  // { input: 'canara-bank.', output: 'canara' }
  // ,
  // { input: 'canara', output: 'canara' }
  // ,
  // { input: 'canara-bank', output: 'canara' }
  // ,
  // { input: 'canara', output: 'canara' }
  // ,
  // { input: 'canara . bank', output: 'canara' }
  // ,
  // { input: 'canara', output: 'canara' }
  // ,
  // { input: 'canara .bank', output: 'canara' }
  // ,
  // { input: 'canara', output: 'canara' }
  // ,
  // { input: 'canara_bank.', output: 'canara' }
  // ,
  // { input: 'canara', output: 'canara' }
  // ,
  // { input: 'canara_bank', output: 'canara' }
  // ,
  // { input: 'canara', output: 'canara' }
  // ,
  // { input: 'canara bank.', output: 'canara' }
  // ,
  // { input: 'canara', output: 'canara' }
  // ,
  // { input: 'canara.bank', output: 'canara' }
  // ,
  // { input: 'c a n a r a', output: 'canara' }
  // ,
  // { input: 'central bank of india', output: 'cbi' }
  // ,
  // { input: 'centr_al bank of india', output: 'cbi' }
  // ,
  // { input: 'central bank of india.', output: 'cbi' }
  // ,
  // { input: 'central bank_of india', output: 'cbi' }
  // ,
  // { input: 'c_b_i', output: 'cbi' }
  // ,
  // { input: 'ce_nt_ral bank of india', output: 'cbi' }
  // ,
  // { input: 'central bank of_india', output: 'cbi' }
  // ,
  // { input: 'central_bank of india', output: 'cbi' }
  // ,
  // { input: 'central bank_of_india', output: 'cbi' }
  // ,
  // { input: 'cen_tral bank of india', output: 'cbi' }
  // ,
  // { input: 'central.bank of india', output: 'cbi' }
  // ,
  // { input: 'central bank of india', output: 'cbi' }
  // ,
  // { input: 'c.e.n.t.r.a.l. .b.a.n.k. .o.f. .i.n.d.i.a', output: 'cbi' }
  // ,
  // { input: 'ce_ntral b_ank of india', output: 'cbi' }
  // ,
  // { input: 'central bank of india', output: 'cbi' }
  // ,
  // { input: 'cen-t-ral bank o-f india', output: 'cbi' }
  // ,
  // { input: 'central bank of india', output: 'cbi' }
  // ,
  // { input: 'central bank of india', output: 'cbi' }
  // ,
  // { input: 'central bank of india', output: 'cbi' }
  // ,
  // { input: 'central bank of india', output: 'cbi' }
  // ,
  // { input: 'central bank of india', output: 'cbi' }
  // ,
  // { input: 'central bank of india', output: 'cbi' }
  // ,
  // { input: 'central bank of india', output: 'cbi' }
  // ,
  // { input: 'central bank of india', output: 'cbi' }
  // ,
  // { input: 'central bank of india', output: 'cbi' }
  // ,
  // { input: 'central bank of india', output: 'cbi' }
  // ,
  // { input: 'central bank of india', output: 'cbi' }
  // ,
  // { input: 'central bank of india', output: 'cbi' }
  // ,
  // { input: 'central bank of india', output: 'cbi' }
  // ,
  // { input: 'central bank of india', output: 'cbi' }
  // ,
  // { input: 'central bank of india', output: 'cbi' }
  // ,
  // { input: 'central bank of india', output: 'cbi' }
  // ,
  // { input: 'central bank of india', output: 'cbi' }
  // ,
  // { input: 'central bank of india', output: 'cbi' }
  // ,
  // { input: 'central bank of india', output: 'cbi' }
  // ,
  // { input: 'central bank of india', output: 'cbi' }
  // ,
  // { input: 'central bank of india', output: 'cbi' }
  // ,
  // { input: 'central bank of india', output: 'cbi' }
  // ,
  // { input: 'csb bank', output: 'csb' }
  // ,
  // { input: 'c_s_b bank', output: 'csb' }
  // ,
  // { input: 'csb_bank', output: 'csb' }
  // ,
  // { input: 'csb.bank', output: 'csb' }
  // ,
  // { input: 'catholic syrian bank limited', output: 'csb' }
  // ,
  // { input: 'catholic_syrian_bank limited', output: 'csb' }
  // ,
  // { input: 'catholic syrian bank_limited', output: 'csb' }
  // ,
  // { input: 'catholic syrian bank. limited', output: 'csb' }
  // ,
  // { input: 'catholic syrian bank', output: 'csb' }
  // ,
  // { input: 'catholic_syrian_bank', output: 'csb' }
  // ,
  // { input: 'catholic syrian.bank', output: 'csb' }
  // ,
  // { input: 'catholic syrian_bank', output: 'csb' }
  // ,
  // { input: 'csbkr', output: 'csb' }
  // ,
  // { input: 'c_s_bkr', output: 'csb' }
  // ,
  // { input: 'csb_kr', output: 'csb' }
  // ,
  // { input: 'csb.kr', output: 'csb' }
  // ,
  // { input: 'city_union_bank', output: 'cub' }
  // ,
  // { input: 'city.union.bank', output: 'cub' }
  // ,
  // { input: 'city union bank', output: 'cub' }
  // ,
  // { input: 'city union bank', output: 'cub' }
  // ,
  // { input: 'ci_ub_r', output: 'cub' }
  // ,
  // { input: 'ci_ub.c', output: 'cub' }
  // ,
  // { input: 'ciubr', output: 'cub' }
  // ,
  // { input: 'ciubc', output: 'cub' }
  // ,
  // { input: 'city-union-bank', output: 'cub' }
  // ,
  // { input: 'city union bank', output: 'cub' }
  // ,
  // { input: 'city.union.bank', output: 'cub' }
  // ,
  // { input: 'city union bank', output: 'cub' }
  // ,
  // { input: 'ci-ub.r', output: 'cub' }
  // ,
  // { input: 'ciubr', output: 'cub' }
  // ,
  // { input: 'ciubc', output: 'cub' }
  // ,
  // { input: 'city.union.bank', output: 'cub' }
  // ,
  // { input: 'city union bank', output: 'cub' }
  // ,
  // { input: 'city.union.bank', output: 'cub' }
  // ,
  // { input: 'city_union_bank', output: 'cub' }
  // ,
  // { input: 'ci_ub.r', output: 'cub' }
  // ,
  // { input: 'ciubr', output: 'cub' }
  // ,
  // { input: 'ciubc', output: 'cub' }
  // ,
  // { input: 'city union bank', output: 'cub' }
  // ,
  // { input: 'city.union.bank', output: 'cub' }
  // ,
  // { input: 'city union bank', output: 'cub' }
  // ,
  // { input: 'city_union_bank', output: 'cub' }
  // ,
  // { input: 'ci_ub.r', output: 'cub' }
  // ,
  // { input: 'ciubr', output: 'cub' }
  // ,
  // { input: 'ciubc', output: 'cub' }
  // ,
  // { input: 'city union bank', output: 'cub' }
  // ,
  // { input: 'city_union_bank', output: 'cub' }
  // ,
  // { input: 'city union bank', output: 'cub' }
  // ,
  // { input: 'city_union_bank', output: 'cub' }
  // ,
  // { input: 'ci_ub.r', output: 'cub' }
  // ,
  // { input: 'ciubr', output: 'cub' }
  // ,
  // { input: 'ciubc', output: 'cub' }
  // ,
  // { input: 'city union bank', output: 'cub' }
  // ,
  // { input: 'city union bank', output: 'cub' }
  // ,
  // { input: 'ciubr', output: 'cub' }
  // ,
  // { input: 'ciubc', output: 'cub' }
  // ,
  // { input: 'dbs', output: 'dbs' }
  // ,
  // { input: 'dbs-bank', output: 'dbs' }
  // ,
  // { input: 'dbs_bank', output: 'dbs' }
  // ,
  // { input: 'dbs.bank', output: 'dbs' }
  // ,
  // { input: 'digibank', output: 'dbs' }
  // ,
  // { input: 'digi-bank', output: 'dbs' }
  // ,
  // { input: 'digi_bank', output: 'dbs' }
  // ,
  // { input: 'digi.bank', output: 'dbs' }
  // ,
  // { input: 'dbssr', output: 'dbs' }
  // ,
  // { input: 'dbs-sr', output: 'dbs' }
  // ,
  // { input: 'dbs_sr', output: 'dbs' }
  // ,
  // { input: 'dbs.sr', output: 'dbs' }
  // ,
  // { input: 'dbs', output: 'dbs' }
  // ,
  // { input: 'dbs-bank', output: 'dbs' }
  // ,
  // { input: 'dbs_bank', output: 'dbs' }
  // ,
  // { input: 'dbs.bank', output: 'dbs' }
  // ,
  // { input: 'digibank', output: 'dbs' }
  // ,
  // { input: 'digi-bank', output: 'dbs' }
  // ,
  // { input: 'digi_bank', output: 'dbs' }
  // ,
  // { input: 'digi.bank', output: 'dbs' }
  // ,
  // { input: 'dbssr', output: 'dbs' }
  // ,
  // { input: 'dbs-sr', output: 'dbs' }
  // ,
  // { input: 'dbs_sr', output: 'dbs' }
  // ,
  // { input: 'dbs.sr', output: 'dbs' }
  // ,
  // { input: 'dbs', output: 'dbs' }
  // ,
  // { input: 'dbs-bank', output: 'dbs' }
  // ,
  // { input: 'dbs_bank', output: 'dbs' }
  // ,
  // { input: 'dbs.bank', output: 'dbs' }
  // ,
  // { input: 'digibank', output: 'dbs' }
  // ,
  // { input: 'digi-bank', output: 'dbs' }
  // ,
  // { input: 'digi_bank', output: 'dbs' }
  // ,
  // { input: 'digi.bank', output: 'dbs' }
  // ,
  // { input: 'dbssr', output: 'dbs' }
  // ,
  // { input: 'dbs-sr', output: 'dbs' }
  // ,
  // { input: 'dbs_sr', output: 'dbs' }
  // ,
  // { input: 'dbs.sr', output: 'dbs' }
  // ,
  // { input: 'bom', output: 'bom' }
  // ,
  // { input: 'ba_nk of maharashtra', output: 'bom' }
  // ,
  // { input: 'mah.r', output: 'bom' }
  // ,
  // { input: 'ban-k_of_maharashtra', output: 'bom' }
  // ,
  // { input: 'ba nk of maharashtra', output: 'bom' }
  // ,
  // { input: 'b_om', output: 'bom' }
  // ,
  // { input: 'maharashtra', output: 'bom' }
  // ,
  // { input: 'bom', output: 'bom' }
  // ,
  // { input: 'ba nk_of_maharashtra', output: 'bom' }
  // ,
  // { input: 'maharashtra', output: 'bom' }
  // ,
  // { input: 'ban-k_of maharashtra', output: 'bom' }
  // ,
  // { input: 'maharashtra', output: 'bom' }
  // ,
  // { input: 'ba nk_of_maharashtra', output: 'bom' }
  // ,
  // { input: 'bom', output: 'bom' }
  // ,
  // { input: 'maharashtra', output: 'bom' }
  // ,
  // { input: 'bom', output: 'bom' }
  // ,
  // { input: 'mah.r', output: 'bom' }
  // ,
  // { input: 'ba nk_of maharashtra', output: 'bom' }
  // ,
  // { input: 'bank of maharashtra', output: 'bom' }
  // ,
  // { input: 'maharashtra', output: 'bom' }
  // ,
  // { input: 'ba_nk of maharashtra', output: 'bom' }
  // ,
  // { input: 'ban-k of maharashtra', output: 'bom' }
  // ,
  // { input: 'ba nk_of_maharashtra', output: 'bom' }
  // ,
  // { input: 'bom', output: 'bom' }
  // ,
  // { input: 'maharashtra', output: 'bom' }
  // ,
  // { input: 'maharashtra', output: 'bom' }
  // ,
  // { input: 'ba-nk of maharashtra', output: 'bom' }
  // ,
  // { input: 'ba_nk_of maharashtra', output: 'bom' }
  // ,
  // { input: 'bom', output: 'bom' }
  // ,
  // { input: 'bank_of maharashtra', output: 'bom' }
  // ,
  // { input: 'maharashtra', output: 'bom' }
  // ,
  // { input: 'b_om', output: 'bom' }
  // ,
  // { input: 'maharashtra', output: 'bom' }
  // ,
  // { input: 'ba nk of maharashtra', output: 'bom' }
  // ,
  // { input: 'ba-nk of maharashtra', output: 'bom' }
  // ,
  // { input: 'bank_of_maharashtra', output: 'bom' }
  // ,
  // { input: 'ba nk of maharashtra', output: 'bom' }
  // ,
  // { input: 'maharashtra', output: 'bom' }
  // ,
  // { input: 'bank of maharashtra', output: 'bom' }
  // ,
  // { input: 'canara', output: 'canara' }
  // ,
  // { input: 'canara bank', output: 'canara' }
  // ,
  // { input: 'cnrbr', output: 'canara' }
  // ,
  // { input: 'canara.', output: 'canara' }
  // ,
  // { input: 'canara-bank', output: 'canara' }
  // ,
  // { input: 'canara_bank', output: 'canara' }
  // ,
  // { input: 'canara bank.', output: 'canara' }
  // ,
  // { input: 'canara.bank', output: 'canara' }
  // ,
  // { input: 'c a n a r a', output: 'canara' }
  // ,
  // { input: 'can_ara', output: 'canara' }
  // ,
  // { input: 'canara.bank', output: 'canara' }
  // ,
  // { input: 'canara bank', output: 'canara' }
  // ,
  // { input: 'canara_bank', output: 'canara' }
  // ,
  // { input: 'canara', output: 'canara' }
  // ,
  // { input: 'canara_bank', output: 'canara' }
  // ,
  // { input: 'canara bank', output: 'canara' }
  // ,
  // { input: 'canara!', output: 'canara' }
  // ,
  // { input: 'canara', output: 'canara' }
  // ,
  // { input: 'canara bank!', output: 'canara' }
  // ,
  // { input: 'canara', output: 'canara' }
  // ,
  // { input: 'canara - bank', output: 'canara' }
  // ,
  // { input: 'canara', output: 'canara' }
  // ,
  // { input: 'canara -bank', output: 'canara' }
  // ,
  // { input: 'canara', output: 'canara' }
  // ,
  // { input: 'canara-bank.', output: 'canara' }
  // ,
  // { input: 'canara', output: 'canara' }
  // ,
  // { input: 'canara-bank', output: 'canara' }
  // ,
  // { input: 'canara', output: 'canara' }
  // ,
  // { input: 'canara . bank', output: 'canara' }
  // ,
  // { input: 'canara', output: 'canara' }
  // ,
  // { input: 'canara .bank', output: 'canara' }
  // ,
  // { input: 'canara', output: 'canara' }
  // ,
  // { input: 'canara_bank.', output: 'canara' }
  // ,
  // { input: 'canara', output: 'canara' }
  // ,
  // { input: 'canara_bank', output: 'canara' }
  // ,
  // { input: 'canara', output: 'canara' }
  // ,
  // { input: 'canara bank.', output: 'canara' }
  // ,
  // { input: 'canara', output: 'canara' }
  // ,
  // { input: 'canara.bank', output: 'canara' }
  // ,
  // { input: 'c a n a r a', output: 'canara' }
  // ,
  // { input: 'csb bank', output: 'csb' }
  // ,
  // { input: 'c_s_b bank', output: 'csb' }
  // ,
  // { input: 'csb_bank', output: 'csb' }
  // ,
  // { input: 'csb.bank', output: 'csb' }
  // ,
  // { input: 'catholic syrian bank limited', output: 'csb' }
  // ,
  // { input: 'catholic_syrian_bank limited', output: 'csb' }
  // ,
  // { input: 'catholic syrian bank_limited', output: 'csb' }
  // ,
  // { input: 'catholic syrian bank. limited', output: 'csb' }
  // ,
  // { input: 'catholic syrian bank', output: 'csb' }
  // ,
  // { input: 'catholic_syrian_bank', output: 'csb' }
  // ,
  // { input: 'catholic syrian.bank', output: 'csb' }
  // ,
  // { input: 'catholic syrian_bank', output: 'csb' }
  // ,
  // { input: 'csbkr', output: 'csb' }
  // ,
  // { input: 'c_s_bkr', output: 'csb' }
  // ,
  // { input: 'csb_kr', output: 'csb' }
  // ,
  // { input: 'csb.kr', output: 'csb' }
  // ,
  // { input: 'city_union_bank', output: 'cub' }
  // ,
  // { input: 'city.union.bank', output: 'cub' }
  // ,
  // { input: 'city union bank', output: 'cub' }
  // ,
  // { input: 'city union bank', output: 'cub' }
  // ,
  // { input: 'ci_ub_r', output: 'cub' }
  // ,
  // { input: 'ci_ub.c', output: 'cub' }
  // ,
  // { input: 'ciubr', output: 'cub' }
  // ,
  // { input: 'ciubc', output: 'cub' }
  // ,
  // { input: 'city-union-bank', output: 'cub' }
  // ,
  // { input: 'city union bank', output: 'cub' }
  // ,
  // { input: 'city.union.bank', output: 'cub' }
  // ,
  // { input: 'city union bank', output: 'cub' }
  // ,
  // { input: 'ci-ub.r', output: 'cub' }
  // ,
  // { input: 'ciubr', output: 'cub' }
  // ,
  // { input: 'ciubc', output: 'cub' }
  // ,
  // { input: 'city.union.bank', output: 'cub' }
  // ,
  // { input: 'city union bank', output: 'cub' }
  // ,
  // { input: 'city.union.bank', output: 'cub' }
  // ,
  // { input: 'city_union_bank', output: 'cub' }
  // ,
  // { input: 'ci_ub.r', output: 'cub' }
  // ,
  // { input: 'ciubr', output: 'cub' }
  // ,
  // { input: 'ciubc', output: 'cub' }
  // ,
  // { input: 'city union bank', output: 'cub' }
  // ,
  // { input: 'city.union.bank', output: 'cub' }
  // ,
  // { input: 'city union bank', output: 'cub' }
  // ,
  // { input: 'city_union_bank', output: 'cub' }
  // ,
  // { input: 'ci_ub.r', output: 'cub' }
  // ,
  // { input: 'ciubr', output: 'cub' }
  // ,
  // { input: 'ciubc', output: 'cub' }
  // ,
  // { input: 'city union bank', output: 'cub' }
  // ,
  // { input: 'city_union_bank', output: 'cub' }
  // ,
  // { input: 'city union bank', output: 'cub' }
  // ,
  // { input: 'city_union_bank', output: 'cub' }
  // ,
  // { input: 'ci_ub.r', output: 'cub' }
  // ,
  // { input: 'ciubr', output: 'cub' }
  // ,
  // { input: 'ciubc', output: 'cub' }
  // ,
  // { input: 'city union bank', output: 'cub' }
  // ,
  // { input: 'city union bank', output: 'cub' }
  // ,
  // { input: 'ciubr', output: 'cub' }
  // ,
  // { input: 'ciubc', output: 'cub' }
  // ,
  // { input: 'dbs', output: 'dbs' }
  // ,
  // { input: 'dbs-bank', output: 'dbs' }
  // ,
  // { input: 'dbs_bank', output: 'dbs' }
  // ,
  // { input: 'dbs.bank', output: 'dbs' }
  // ,
  // { input: 'digibank', output: 'dbs' }
  // ,
  // { input: 'digi-bank', output: 'dbs' }
  // ,
  // { input: 'digi_bank', output: 'dbs' }
  // ,
  // { input: 'digi.bank', output: 'dbs' }
  // ,
  // { input: 'dbssr', output: 'dbs' }
  // ,
  // { input: 'dbs-sr', output: 'dbs' }
  // ,
  // { input: 'dbs_sr', output: 'dbs' }
  // ,
  // { input: 'dbs.sr', output: 'dbs' }
  // ,
  // { input: 'dbs', output: 'dbs' }
  // ,
  // { input: 'dbs-bank', output: 'dbs' }
  // ,
  // { input: 'dbs_bank', output: 'dbs' }
  // ,
  // { input: 'dbs.bank', output: 'dbs' }
  // ,
  // { input: 'digibank', output: 'dbs' }
  // ,
  // { input: 'digi-bank', output: 'dbs' }
  // ,
  // { input: 'digi_bank', output: 'dbs' }
  // ,
  // { input: 'digi.bank', output: 'dbs' }
  // ,
  // { input: 'dbssr', output: 'dbs' }
  // ,
  // { input: 'dbs-sr', output: 'dbs' }
  // ,
  // { input: 'dbs_sr', output: 'dbs' }
  // ,
  // { input: 'dbs.sr', output: 'dbs' }
  // ,
  // { input: 'dbs', output: 'dbs' }
  // ,
  // { input: 'dbs-bank', output: 'dbs' }
  // ,
  // { input: 'dbs_bank', output: 'dbs' }
  // ,
  // { input: 'dbs.bank', output: 'dbs' }
  // ,
  // { input: 'digibank', output: 'dbs' }
  // ,
  // { input: 'digi-bank', output: 'dbs' }
  // ,
  // { input: 'digi_bank', output: 'dbs' }
  // ,
  // { input: 'digi.bank', output: 'dbs' }
  // ,
  // { input: 'dbssr', output: 'dbs' }
  // ,
  // { input: 'dbs-sr', output: 'dbs' }
  // ,
  // { input: 'dbs_sr', output: 'dbs' }
  // ,
  // { input: 'dbs.sr', output: 'dbs' }
  // ,
  // { input: 'deutsche', output: 'deutsche' }
  // ,
  // { input: 'de-utsche', output: 'deutsche' }
  // ,
  // { input: 'de_utsc-he', output: 'deutsche' }
  // ,
  // { input: 'deut sche', output: 'deutsche' }
  // ,
  // { input: 'deutsche b_ank', output: 'deutsche' }
  // ,
  // { input: 'deut._sche', output: 'deutsche' }
  // ,
  // { input: 'dbeu-tsch-e', output: 'deutsche' }
  // ,
  // { input: 'deut.sche', output: 'deutsche' }
  // ,
  // { input: 'deuts-che b-ank', output: 'deutsche' }
  // ,
  // { input: 'd_eut sche', output: 'deutsche' }
  // ,
  // { input: 'deut sche', output: 'deutsche' }
  // ,
  // { input: 'deut s_che', output: 'deutsche' }
  // ,
  // { input: 'deut sche', output: 'deutsche' }
  // ,
  // { input: 'd-eutsche', output: 'deutsche' }
  // ,
  // { input: 'de-utsche', output: 'deutsche' }
  // ,
  // { input: 'deutsche', output: 'deutsche' }
  // ,
  // { input: 'd_eutsche', output: 'deutsche' }
  // ,
  // { input: 'deutsche', output: 'deutsche' }
  // ,
  // { input: 'deut_sche', output: 'deutsche' }
  // ,
  // { input: 'de_utsche', output: 'deutsche' }
  // ,
  // { input: 'l-vbr', output: 'lvbr' }
  // ,
  // { input: 'lvb.retail', output: 'lvbr' }
  // ,
  // { input: 'lvb retail', output: 'lvbr' }
  // ,
  // { input: 'la_vbr', output: 'lvbr' }
  // ,
  // { input: 'l vb-retail', output: 'lvbr' }
  // ,
  // { input: 'la.vbr', output: 'lvbr' }
  // ,
  // { input: 'lv_br', output: 'lvbr' }
  // ,
  // { input: 'lvb.retail', output: 'lvbr' }
  // ,
  // { input: 'lv-b r e t a i l', output: 'lvbr' }
  // ,
  // { input: 'lav_br', output: 'lvbr' }
  // ,
  // { input: 'lvb_retail', output: 'lvbr' }
  // ,
  // { input: 'lvb retail', output: 'lvbr' }
  // ,
  // { input: 'l.avbr', output: 'lvbr' }
  // ,
  // { input: 'l-v-b-r-e-t-a-i-l', output: 'lvbr' }
  // ,
  // { input: 'l_av_br', output: 'lvbr' }
  // ,
  // { input: 'lv.b.retail', output: 'lvbr' }
  // ,
  // { input: 'l_vbretail', output: 'lvbr' }
  // ,
  // { input: 'lavb.r', output: 'lvbr' }
  // ,
  // { input: 'lvbr', output: 'lvbr' }
  // ,
  // { input: 'lvb.retail', output: 'lvbr' }
  // ,
  // { input: 'l-vbr', output: 'lvbr' }
  // ,
  // { input: 'l_vbr', output: 'lvbr' }
  // ,
  // { input: 'lvb.retail', output: 'lvbr' }
  // ,
  // { input: 'lvb retail', output: 'lvbr' }
  // ,
  // { input: 'la-vbr', output: 'lvbr' }
  // ,
  // { input: 'l vb_retail', output: 'lvbr' }
  // ,
  // { input: 'la.vbr', output: 'lvbr' }
  // ,
  // { input: 'lav.br', output: 'lvbr' }
  // ,
  // { input: 'lv_br', output: 'lvbr' }
  // ,
  // { input: 'l-vbretail', output: 'lvbr' }
  // ,
  // { input: 'lavbr', output: 'lvbr' }
  // ,
  // { input: 'lv.b.retail', output: 'lvbr' }
  // ,
  // { input: 'l_avbretail', output: 'lvbr' }
  // ,
  // { input: 'l.avbr', output: 'lvbr' }
  // ,
  // { input: 'l-v-b-r-e-tai-l', output: 'lvbr' }
  // ,
  // { input: 'lvbretail', output: 'lvbr' }
  // ,
  // { input: '_lavbr', output: 'lvbr' }
  // ,
  // { input: 'lavb.retail', output: 'lvbr' }
  // ,
  // { input: 'l_vb.r_e.tai.l', output: 'lvbr' }
  // ,
  // { input: 'pnbc', output: 'pnbc' }
  // ,
  // { input: 'pnbc-', output: 'pnbc' }
  // ,
  // { input: 'pnbc_', output: 'pnbc' }
  // ,
  // { input: 'pnbc.', output: 'pnbc' }
  // ,
  // { input: 'pnbc ', output: 'pnbc' }
  // ,
  // { input: 'punjab national bank corporate', output: 'pnbc' }
  // ,
  // { input: 'punjab national bank corporate-', output: 'pnbc' }
  // ,
  // { input: 'punjab national bank corporate_', output: 'pnbc' }
  // ,
  // { input: 'punjab national bank corporate.', output: 'pnbc' }
  // ,
  // { input: 'punjab national bank corporate ', output: 'pnbc' }
  // ,
  // { input: 'pnb', output: 'pnbc' }
  // ,
  // { input: 'pnb-', output: 'pnbc' }
  // ,
  // { input: 'pnb_', output: 'pnbc' }
  // ,
  // { input: 'pnb.', output: 'pnbc' }
  // ,
  // { input: 'pnb ', output: 'pnbc' }
  // ,
  // { input: 'punjab national bank', output: 'pnbc' }
  // ,
  // { input: 'punjab national bank-', output: 'pnbc' }
  // ,
  // { input: 'punjab national bank_', output: 'pnbc' }
  // ,
  // { input: 'punjab national bank.', output: 'pnbc' }
  // ,
  // { input: 'punjab national bank ', output: 'pnbc' }
  // ,
  // { input: 'punbc', output: 'pnbc' }
  // ,
  // { input: 'punbc-', output: 'pnbc' }
  // ,
  // { input: 'punbc_', output: 'pnbc' }
  // ,
  // { input: 'punbc.', output: 'pnbc' }
  // ,
  // { input: 'punbc ', output: 'pnbc' }
  // ,
  // { input: 'p-nbr', output: 'pnbr' }
  // ,
  // { input: 'punjab national bank r.etail', output: 'pnbr' }
  // ,
  // { input: 'pu_nbr', output: 'pnbr' }
  // ,
  // { input: 'punbr', output: 'pnbr' }
  // ,
  // { input: 'p.nbr', output: 'pnbr' }
  // ,
  // { input: 'punjab national bank ret_ail', output: 'pnbr' }
  // ,
  // { input: 'p nbr', output: 'pnbr' }
  // ,
  // { input: 'p_unbr', output: 'pnbr' }
  // ,
  // { input: 'pun.br', output: 'pnbr' }
  // ,
  // { input: 'punjab national bank _retail', output: 'pnbr' }
  // ,
  // { input: 'pu.nbr', output: 'pnbr' }
  // ,
  // { input: 'punjab national bank ret.ail', output: 'pnbr' }
  // ,
  // { input: 'pn.br', output: 'pnbr' }
  // ,
  // { input: 'pun-jab national bank retail', output: 'pnbr' }
  // ,
  // { input: 'p-nbr', output: 'pnbr' }
  // ,
  // { input: 'p_unbr', output: 'pnbr' }
  // ,
  // { input: 'punjab _national bank retail', output: 'pnbr' }
  // ,
  // { input: 'p nbr', output: 'pnbr' }
  // ,
  // { input: 'p_unbr', output: 'pnbr' }
  // ,
  // { input: 'punjab nati_onal bank retail', output: 'pnbr' }
  // ,
  // { input: 'pu.nbr', output: 'pnbr' }
  // ,
  // { input: 'punjab national bank ret_ail', output: 'pnbr' }
  // ,
  // { input: 'p.nbr', output: 'pnbr' }
  // ,
  // { input: 'punjab national bank re.tail', output: 'pnbr' }
  // ,
  // { input: 'pn.br', output: 'pnbr' }
  // ,
  // { input: 'pun-jab national bank retail', output: 'pnbr' }
  // ,
  // { input: 'pu-nbr', output: 'pnbr' }
  // ,
  // { input: 'punjab national _bank retail', output: 'pnbr' }
  // ,
  // { input: 'pu.nbr', output: 'pnbr' }
  // ,
  // { input: 'p nbr', output: 'pnbr' }
  // ,
  // { input: 'punjab nationa-l bank retail', output: 'pnbr' }
  // ,
  // { input: 'p nbr', output: 'pnbr' }
  // ,
  // { input: 'punjab natio_nal bank retail', output: 'pnbr' }
  // ,
  // { input: 'pu.nbr', output: 'pnbr' }
  // ,
  // { input: 'p.nbr', output: 'pnbr' }
  // ,
  // { input: 'punjab national bank r.etail', output: 'pnbr' }
  // ,
  // { input: 'pn.br', output: 'pnbr' }
  // ,
  // { input: 'punjab nation-al bank retail', output: 'pnbr' }
  // ,
  // { input: 'p-nbr', output: 'pnbr' }
  // ,
  // { input: 'punjab national bank ret_ail', output: 'pnbr' }
  // ,
  // { input: 'rbl', output: 'rbl' }
  // ,
  // { input: 'ratnakar bank', output: 'rbl' }
  // ,
  // { input: 'rbl bank', output: 'rbl' }
  // ,
  // { input: 'ratnr', output: 'rbl' }
  // ,
  // { input: 'r_l', output: 'rbl' }
  // ,
  // { input: 'ratnakar_bank', output: 'rbl' }
  // ,
  // { input: 'rbl.bank', output: 'rbl' }
  // ,
  // { input: 'ratnr', output: 'rbl' }
  // ,
  // { input: 'rb_l', output: 'rbl' }
  // ,
  // { input: 'ratna.kar bank', output: 'rbl' }
  // ,
  // { input: 'rb_l bank', output: 'rbl' }
  // ,
  // { input: 'ratnr', output: 'rbl' }
  // ,
  // { input: 'rbl', output: 'rbl' }
  // ,
  // { input: 'ratnakar bank', output: 'rbl' }
  // ,
  // { input: 'rbl bank', output: 'rbl' }
  // ,
  // { input: 'ratnr', output: 'rbl' }
  // ,
  // { input: 'r__l', output: 'rbl' }
  // ,
  // { input: 'ratnakar bank', output: 'rbl' }
  // ,
  // { input: 'rbl bank', output: 'rbl' }
  // ,
  // { input: 'ratnr', output: 'rbl' }
  // ,
  // { input: 'rbl', output: 'rbl' }
  // ,
  // { input: 'ratnakar.bank', output: 'rbl' }
  // ,
  // { input: 'rbl bank', output: 'rbl' }
  // ,
  // { input: 'rat.nr', output: 'rbl' }
  // ,
  // { input: 'rbl', output: 'rbl' }
  // ,
  // { input: 'ratnakar bank', output: 'rbl' }
  // ,
  // { input: 'rbl bank', output: 'rbl' }
  // ,
  // { input: 'ratnr', output: 'rbl' }
  // ,
  // { input: 'r-b-l', output: 'rbl' }
  // ,
  // { input: 'ratnakar bank', output: 'rbl' }
  // ,
  // { input: 'rbl bank', output: 'rbl' }
  // ,
  // { input: 'ratnr', output: 'rbl' }
  // ,
  // { input: 'rbl', output: 'rbl' }
  // ,
  // { input: 'ratnakar bank', output: 'rbl' }
  // ,
  // { input: 'rbl bank', output: 'rbl' }
  // ,
  // { input: 'ratnr', output: 'rbl' }
  // ,
  // { input: 'rbl corporate', output: 'rblc' }
  // ,
  // { input: '_rbl corporate', output: 'rblc' }
  // ,
  // { input: 'rat corporate', output: 'rblc' }
  // ,
  // { input: 'rbl.corporate', output: 'rblc' }
  // ,
  // { input: 'rblcorporate', output: 'rblc' }
  // ,
  // { input: 'rbl corporate ', output: 'rblc' }
  // ,
  // { input: 'rbl-corporate', output: 'rblc' }
  // ,
  // { input: 'rbl_corporate', output: 'rblc' }
  // ,
  // { input: 'rblcorporate ', output: 'rblc' }
  // ,
  // { input: ' rbl corporate', output: 'rblc' }
  // ,
  // { input: 'rsbl corporate', output: 'rblc' }
  // ,
  // { input: 'rbl c_orporate', output: 'rblc' }
  // ,
  // { input: 'rb-l corporate', output: 'rblc' }
  // ,
  // { input: 'rbl c.orporate', output: 'rblc' }
  // ,
  // { input: 'rblcor porate', output: 'rblc' }
  // ,
  // { input: 'rbl kcorporate', output: 'rblc' }
  // ,
  // { input: 'rb_l corporate', output: 'rblc' }
  // ,
  // { input: 'rblco.rporate', output: 'rblc' }
  // ,
  // { input: 'rblco rporate', output: 'rblc' }
  // ,
  // { input: 'rblc orporate', output: 'rblc' }
  // ,
  // { input: 'rblc.orporate', output: 'rblc' }
  // ,
  // { input: 'rblcor_porat_e', output: 'rblc' }
  // ,
  // { input: 'rblc-orporate', output: 'rblc' }
  // ,
  // { input: 'rblc_corporate', output: 'rblc' }
  // ,
  // { input: 'rblcorpor-ate', output: 'rblc' }
  // ,
  // { input: 'rblco_rporate', output: 'rblc' }
  // ,
  // { input: 'rblcorpor_ate', output: 'rblc' }
  // ,
  // { input: 'r blcorporate', output: 'rblc' }
  // ,
  // { input: 'rbl corpor_ate', output: 'rblc' }
  // ,
  // { input: 'rblc-orpor.ate', output: 'rblc' }
  // ,
  // { input: 'rblc orpora_te', output: 'rblc' }
  // ,
  // { input: 'rblcorp.orate', output: 'rblc' }
  // ,
  // { input: 'rblcorporat_ e', output: 'rblc' }
  // ,
  // { input: 'rblc_orpor_ate', output: 'rblc' }
  // ,
  // { input: 'rblc_orporate', output: 'rblc' }
  // ,
  // { input: 'rb_lcorporate', output: 'rblc' }
  // ,
  // { input: 'rblcorpo_rate', output: 'rblc' }
  // ,
  // { input: 'rblcorpora_te', output: 'rblc' }
  // ,
  // { input: 'r_blcorpor_ate', output: 'rblc' }
  // ,
  // { input: 'rblcorporat__e', output: 'rblc' }
  // ,
  // { input: 'saraswat', output: 'saraswat' }
  // ,
  // { input: 's_a_raswat', output: 'saraswat' }
  // ,
  // { input: 'saraswat.bank', output: 'saraswat' }
  // ,
  // { input: 'sa ra swat', output: 'saraswat' }
  // ,
  // { input: 'saraswat bank', output: 'saraswat' }
  // ,
  // { input: 's_a_raswat.bank', output: 'saraswat' }
  // ,
  // { input: 'saraswat_bank', output: 'saraswat' }
  // ,
  // { input: 'sa ra swat_bank', output: 'saraswat' }
  // ,
  // { input: 'srcbr', output: 'saraswat' }
  // ,
  // { input: 'sr_cb_r', output: 'saraswat' }
  // ,
  // { input: 'srcbr', output: 'saraswat' }
  // ,
  // { input: 'sr cb r', output: 'saraswat' }
  // ,
  // { input: 's_a_raswat', output: 'saraswat' }
  // ,
  // { input: 'saraswat.bank', output: 'saraswat' }
  // ,
  // { input: 'sa ra swat', output: 'saraswat' }
  // ,
  // { input: 's_a_raswat.bank', output: 'saraswat' }
  // ,
  // { input: 'saraswat_bank', output: 'saraswat' }
  // ,
  // { input: 'sa_ra_s_wat', output: 'saraswat' }
  // ,
  // { input: 'saraswat-bank', output: 'saraswat' }
  // ,
  // { input: 'sa ra swat bank', output: 'saraswat' }
  // ,
  // { input: 's_a_raswat.bank', output: 'saraswat' }
  // ,
  // { input: 'saraswat.bank', output: 'saraswat' }
  // ,
  // { input: 'sa_ra_s_wat', output: 'saraswat' }
  // ,
  // { input: 'saraswat-bank', output: 'saraswat' }
  // ,
  // { input: 'sa ra swat.bank', output: 'saraswat' }
  // ,
  // { input: 's_a_raswat_bank', output: 'saraswat' }
  // ,
  // { input: 'sa ra swat.bank', output: 'saraswat' }
  // ,
  // { input: 'srcbr', output: 'saraswat' }
  // ,
  // { input: 'sr cbr', output: 'saraswat' }
  // ,
  // { input: 'srcbr', output: 'saraswat' }
  // ,
  // { input: 'sr cbr', output: 'saraswat' }
  // ,
  // { input: 's_a_raswat', output: 'saraswat' }
  // ,
  // { input: 'saraswat.bank', output: 'saraswat' }
  // ,
  // { input: 'sa ra swat', output: 'saraswat' }
  // ,
  // { input: 's_a_raswat.bank', output: 'saraswat' }
  // ,
  // { input: 'saraswat_bank', output: 'saraswat' }
  // ,
  // { input: 'sa.ra.swat', output: 'saraswat' }
  // ,
  // { input: 'saraswat.bank', output: 'saraswat' }
  // ,
  // { input: 'sa ra swat bank', output: 'saraswat' }
  // ,
  // { input: 's a r.a swat', output: 'saraswat' }
  // ,
  // { input: 'scb', output: 'scb' }
  // ,
  // { input: 'standard_chartered', output: 'scb' }
  // ,
  // { input: 'standard_chartered_bank', output: 'scb' }
  // ,
  // { input: 'scblr', output: 'scb' }
  // ,
  // { input: 's-cb', output: 'scb' }
  // ,
  // { input: 'standard_chartered-bank', output: 'scb' }
  // ,
  // { input: 'standard chartered_bank', output: 'scb' }
  // ,
  // { input: 'scb_l', output: 'scb' }
  // ,
  // { input: 's.cb', output: 'scb' }
  // ,
  // { input: 'standard.chartered-bank', output: 'scb' }
  // ,
  // { input: 'standard chartered_bank', output: 'scb' }
  // ,
  // { input: 'scb l', output: 'scb' }
  // ,
  // { input: 's cb', output: 'scb' }
  // ,
  // { input: 'standardchartered-bank', output: 'scb' }
  // ,
  // { input: 'standard chartered_bank', output: 'scb' }
  // ,
  // { input: 'scb__l', output: 'scb' }
  // ,
  // { input: 'sc.b', output: 'scb' }
  // ,
  // { input: 'standard_chartered_bank', output: 'scb' }
  // ,
  // { input: 'standard_chartered.bank', output: 'scb' }
  // ,
  // { input: 's--cb', output: 'scb' }
  // ,
  // { input: 'st.andard chartered bank', output: 'scb' }
  // ,
  // { input: 'standard chartered bank', output: 'scb' }
  // ,
  // { input: 'scb', output: 'scb' }
  // ,
  // { input: 'st andardc-hartered bank', output: 'scb' }
  // ,
  // { input: 'standard ch-.rtered bank', output: 'scb' }
  // ,
  // { input: 'standard_chartered bank', output: 'scb' }
  // ,
  // { input: 'standard_ch-rtered bank', output: 'scb' }
  // ,
  // { input: 's-c- b', output: 'scb' }
  // ,
  // { input: 'standard cha.rtered bank', output: 'scb' }
  // ,
  // { input: 'standard_cha.rtered bank', output: 'scb' }
  // ,
  // { input: 'standard_chartered_ba.nk', output: 'scb' }
  // ,
  // { input: 's-.cb', output: 'scb' }
  // ,
  // { input: '_s cb', output: 'scb' }
  // ,
  // { input: 'standard__ch-artered bank', output: 'scb' }
  // ,
  // { input: 'standard_ _chartered bank', output: 'scb' }
  // ,
  // { input: 's._cb', output: 'scb' }
  // ,
  // { input: 'shivalik', output: 'shivalik' }
  // ,
  // { input: 'shivalik bank', output: 'shivalik' }
  // ,
  // { input: 'smcbr', output: 'shivalik' }
  // ,
  // { input: 'shivallik', output: 'shivalik' }
  // ,
  // { input: 'shivalik_bank', output: 'shivalik' }
  // ,
  // { input: 'shivalik.bank', output: 'shivalik' }
  // ,
  // { input: 'shivalik bank', output: 'shivalik' }
  // ,
  // { input: 'shivallik bank', output: 'shivalik' }
  // ,
  // { input: 'shivalik-bank', output: 'shivalik' }
  // ,
  // { input: 'shivallik bank', output: 'shivalik' }
  // ,
  // { input: 'smcbr', output: 'shivalik' }
  // ,
  // { input: 'smcbr_bank', output: 'shivalik' }
  // ,
  // { input: 'smcbr.bank', output: 'shivalik' }
  // ,
  // { input: 'smcbr bank', output: 'shivalik' }
  // ,
  // { input: 'smcbr-bank', output: 'shivalik' }
  // ,
  // { input: 'shivallik_bank', output: 'shivalik' }
  // ,
  // { input: 'shivallik.bank', output: 'shivalik' }
  // ,
  // { input: 'shivallik bank', output: 'shivalik' }
  // ,
  // { input: 'shivallik-bank', output: 'shivalik' }
  // ,
  // { input: 'shivalik bank', output: 'shivalik' }
  // ,
  // { input: 'shivalik_bank', output: 'shivalik' }
  // ,
  // { input: 'shivalik.bank', output: 'shivalik' }
  // ,
  // { input: 'shivalik bank', output: 'shivalik' }
  // ,
  // { input: 'shivalik-bank', output: 'shivalik' }
  // ,
  // { input: 'shivalik bank', output: 'shivalik' }
  // ,
  // { input: 'shivalik_bank', output: 'shivalik' }
  // ,
  // { input: 'shivalik.bank', output: 'shivalik' }
  // ,
  // { input: 'shivalik bank', output: 'shivalik' }
  // ,
  // { input: 'shivalik-bank', output: 'shivalik' }
  // ,
  // { input: 'smcb_r', output: 'shivalik' }
  // ,
  // { input: 'smcbr_bank', output: 'shivalik' }
  // ,
  // { input: 'smcbr.bank', output: 'shivalik' }
  // ,
  // { input: 'smcbr bank', output: 'shivalik' }
  // ,
  // { input: 'smcbr-bank', output: 'shivalik' }
  // ,
  // { input: 'smc_br', output: 'shivalik' }
  // ,
  // { input: 'smc-.br', output: 'shivalik' }
  // ,
  // { input: 'smc_br', output: 'shivalik' }
  // ,
  // { input: 'smcb_r', output: 'shivalik' }
  // ,
  // { input: 'smcbr-bank', output: 'shivalik' }
  // ,
  // { input: 'smcbr.bank', output: 'shivalik' }
  // ,
  // { input: 'smcbr bank', output: 'shivalik' }
  // ,
  // { input: 'sib', output: 'sib' }
  // ,
  // { input: 'sib-', output: 'sib' }
  // ,
  // { input: 'sib_', output: 'sib' }
  // ,
  // { input: 'sib.', output: 'sib' }
  // ,
  // { input: 'si b', output: 'sib' }
  // ,
  // { input: 'south indian bank', output: 'sib' }
  // ,
  // { input: 'south indian bank-', output: 'sib' }
  // ,
  // { input: 'south indian bank_', output: 'sib' }
  // ,
  // { input: 'south indian bank.', output: 'sib' }
  // ,
  // { input: 'south indian bank ', output: 'sib' }
  // ,
  // { input: 'siblr', output: 'sib' }
  // ,
  // { input: 'siblr-', output: 'sib' }
  // ,
  // { input: 'siblr_', output: 'sib' }
  // ,
  // { input: 'siblr.', output: 'sib' }
  // ,
  // { input: 'siblr ', output: 'sib' }
  // ,
  // { input: 's_r', output: 'sur' }
  // ,
  // { input: 'sur_bank', output: 'sur' }
  // ,
  // { input: 'sur.', output: 'sur' }
  // ,
  // { input: 's r', output: 'sur' }
  // ,
  // { input: 'su_r', output: 'sur' }
  // ,
  // { input: 'sur bank', output: 'sur' }
  // ,
  // { input: 'sur ', output: 'sur' }
  // ,
  // { input: 's.r', output: 'sur' }
  // ,
  // { input: 'su r', output: 'sur' }
  // ,
  // { input: 'sur_bank', output: 'sur' }
  // ,
  // { input: 'sur__', output: 'sur' }
  // ,
  // { input: 'su-r', output: 'sur' }
  // ,
  // { input: 'sur bank', output: 'sur' }
  // ,
  // { input: 's_ur', output: 'sur' }
  // ,
  // { input: 'su-r', output: 'sur' }
  // ,
  // { input: 'sur', output: 'sur' }
  // ,
  // { input: 'su__r', output: 'sur' }
  // ,
  // { input: 'sur', output: 'sur' }
  // ,
  // { input: 's ur', output: 'sur' }
  // ,
  // { input: 'su_r', output: 'sur' }
  // ,
  // { input: 'sur-bank', output: 'sur' }
  // ,
  // { input: 'su_r', output: 'sur' }
  // ,
  // { input: 'sur.', output: 'sur' }
  // ,
  // { input: 'sur bank', output: 'sur' }
  // ,
  // { input: 's_ur', output: 'sur' }
  // ,
  // { input: 'sur ', output: 'sur' }
  // ,
  // { input: 'sur.', output: 'sur' }
  // ,
  // { input: 'sur_bank', output: 'sur' }
  // ,
  // { input: 'sur', output: 'sur' }
  // ,
  // { input: 'su r', output: 'sur' }
  // ,
  // { input: 'su-r', output: 'sur' }
  // ,
  // { input: 's r', output: 'sur' }
  // ,
  // { input: 's ur', output: 'sur' }
  // ,
  // { input: 'sur_bank', output: 'sur' }
  // ,
  // { input: 'sur__', output: 'sur' }
  // ,
  // { input: 'sur-bank', output: 'sur' }
  // ,
  // { input: 'su__r', output: 'sur' }
  // ,
  // { input: 'su-r', output: 'sur' }
  // ,
  // { input: 'sur', output: 'sur' }
  // ,
  // { input: 's ur', output: 'sur' }
  // ,
  // { input: 'ta_mcop', output: 'tamcop' }
  // ,
  // { input: 'tamcop_', output: 'tamcop' }
  // ,
  // { input: 'tam. cop', output: 'tamcop' }
  // ,
  // { input: 't_amcop', output: 'tamcop' }
  // ,
  // { input: 'tam_co_p', output: 'tamcop' }
  // ,
  // { input: 'ta-mcop', output: 'tamcop' }
  // ,
  // { input: 't_amcop_', output: 'tamcop' }
  // ,
  // { input: 'tamcop ', output: 'tamcop' }
  // ,
  // { input: 'tam.cop', output: 'tamcop' }
  // ,
  // { input: 'tamcop bank', output: 'tamcop' }
  // ,
  // { input: 'ta mcop', output: 'tamcop' }
  // ,
  // { input: 'tam cop', output: 'tamcop' }
  // ,
  // { input: 'ta_mc_op', output: 'tamcop' }
  // ,
  // { input: 'ta-mcop_', output: 'tamcop' }
  // ,
  // { input: 'tam c_op', output: 'tamcop' }
  // ,
  // { input: 'ta_mco_p', output: 'tamcop' }
  // ,
  // { input: 'ta mcop', output: 'tamcop' }
  // ,
  // { input: 't_am_co_p', output: 'tamcop' }
  // ,
  // { input: 'tamcop  ', output: 'tamcop' }
  // ,
  // { input: 'tam.cop_', output: 'tamcop' }
  // ,
  // { input: 'tam_cop', output: 'tamcop' }
  // ,
  // { input: 't_amcop bank', output: 'tamcop' }
  // ,
  // { input: 'tam.c_op', output: 'tamcop' }
  // ,
  // { input: 'ta-mcop bank', output: 'tamcop' }
  // ,
  // { input: 'tam cop_', output: 'tamcop' }
  // ,
  // { input: 't_amc_op', output: 'tamcop' }
  // ,
  // { input: 'ta_mc_op_', output: 'tamcop' }
  // ,
  // { input: 'ta m_cop', output: 'tamcop' }
  // ,
  // { input: 'tamc_op', output: 'tamcop' }
  // ,
  // { input: 'ta.m_cop', output: 'tamcop' }
  // ,
  // { input: 'ta-mcop ', output: 'tamcop' }
  // ,
  // { input: 't_am_c_op', output: 'tamcop' }
  // ,
  // { input: 'tamc.op', output: 'tamcop' }
  // ,
  // { input: 'tamcop_ba_nk', output: 'tamcop' }
  // ,
  // { input: 'tamc_op_', output: 'tamcop' }
  // ,
  // { input: 'ta.m_cop_', output: 'tamcop' }
  // ,
  // { input: 't_amco_p', output: 'tamcop' }
  // ,
  // { input: 'ta mc_op', output: 'tamcop' }
  // ,
  // { input: 't_amco_p bank', output: 'tamcop' }
  // ,
  // { input: 'ta_mcop ', output: 'tamcop' }
  // ,
  // { input: 'tammerc', output: 'tammerc' }
  // ,
  // { input: 't-a-m-m-e-r-c', output: 'tammerc' }
  // ,
  // { input: 'tammerc_', output: 'tammerc' }
  // ,
  // { input: 'tam merc', output: 'tammerc' }
  // ,
  // { input: 'tammerc bank', output: 'tammerc' }
  // ,
  // { input: 't-a-m-m-e-r-c bank', output: 'tammerc' }
  // ,
  // { input: 'tammerc_bank', output: 'tammerc' }
  // ,
  // { input: 'tam merc bank', output: 'tammerc' }
  // ,
  // { input: 'tammerc.', output: 'tammerc' }
  // ,
  // { input: 't-a-m-m-e-r-c.', output: 'tammerc' }
  // ,
  // { input: 'tammerc_.', output: 'tammerc' }
  // ,
  // { input: 'tam merc.', output: 'tammerc' }
  // ,
  // { input: 'tammerc bank', output: 'tammerc' }
  // ,
  // { input: 't-a-m-m-e-r-c bank', output: 'tammerc' }
  // ,
  // { input: 'tammerc_bank', output: 'tammerc' }
  // ,
  // { input: 'tam merc bank', output: 'tammerc' }
  // ,
  // { input: 'tammerc-', output: 'tammerc' }
  // ,
  // { input: 't-a-m-m-e-r-c-', output: 'tammerc' }
  // ,
  // { input: 'tammerc_-', output: 'tammerc' }
  // ,
  // { input: 'tam merc-', output: 'tammerc' }
  // ,
  // { input: 'tammerc bank', output: 'tammerc' }
  // ,
  // { input: 't-a-m-m-e-r-c bank', output: 'tammerc' }
  // ,
  // { input: 'tammerc_bank', output: 'tammerc' }
  // ,
  // { input: 'tam merc bank', output: 'tammerc' }
  // ,
  // { input: 'tammerc', output: 'tammerc' }
  // ,
  // { input: 't-a-m-m-e-r-c', output: 'tammerc' }
  // ,
  // { input: 'tammerc_', output: 'tammerc' }
  // ,
  // { input: 'tam merc', output: 'tammerc' }
  // ,
  // { input: 'tammerc bank', output: 'tammerc' }
  // ,
  // { input: 't-a-m-m-e-r-c bank', output: 'tammerc' }
  // ,
  // { input: 'tammerc_bank', output: 'tammerc' }
  // ,
  // { input: 'tam merc bank', output: 'tammerc' }
  // ,
  // { input: 'tammerc.', output: 'tammerc' }
  // ,
  // { input: 't-a-m-m-e-r-c.', output: 'tammerc' }
  // ,
  // { input: 'tammerc_.', output: 'tammerc' }
  // ,
  // { input: 'tam merc.', output: 'tammerc' }
  // ,
  // { input: 'tammerc bank', output: 'tammerc' }
  // ,
  // { input: 't-a-m-m-e-r-c bank', output: 'tammerc' }
  // ,
  // { input: 'tammerc_bank', output: 'tammerc' }
  // ,
  // { input: 'tam merc bank', output: 'tammerc' }
  // ,
  // { input: 'u-co', output: 'uco' }
  // ,
  // { input: 'uco', output: 'uco' }
  // ,
  // { input: 'uc_o', output: 'uco' }
  // ,
  // { input: 'uco_', output: 'uco' }
  // ,
  // { input: 'uc_b-a', output: 'uco' }
  // ,
  // { input: 'u.co', output: 'uco' }
  // ,
  // { input: 'uc bank', output: 'uco' }
  // ,
  // { input: 'united.commercial bank', output: 'uco' }
  // ,
  // { input: 'ucb.ar', output: 'uco' }
  // ,
  // { input: 'uc.bac', output: 'uco' }
  // ,
  // { input: 'u c o', output: 'uco' }
  // ,
  // { input: 'uco bank', output: 'uco' }
  // ,
  // { input: 'u.n.i.t.e.d c.o.m.m.e.r.c.i.a.l bank', output: 'uco' }
  // ,
  // { input: 'u_c_b_a_r', output: 'uco' }
  // ,
  // { input: 'u_c_b_a_c', output: 'uco' }
  // ,
  // { input: 'u c.o', output: 'uco' }
  // ,
  // { input: 'united.commercial bank', output: 'uco' }
  // ,
  // { input: 'uco bank', output: 'uco' }
  // ,
  // { input: 'u _c_b_a-r', output: 'uco' }
  // ,
  // { input: 'u-c_bac', output: 'uco' }
  // ,
  // { input: 'union', output: 'union' }
  // ,
  // { input: 'u_n_i_o_n', output: 'union' }
  // ,
  // { input: 'union_bank', output: 'union' }
  // ,
  // { input: 'u_b_i_n_r', output: 'union' }
  // ,
  // { input: 'un.ion', output: 'union' }
  // ,
  // { input: 'u b i n', output: 'union' }
  // ,
  // { input: 'union', output: 'union' }
  // ,
  // { input: 'u-b-i-n', output: 'union' }
  // ,
  // { input: 'u_b_i_n_r', output: 'union' }
  // ,
  // { input: 'union bank', output: 'union' }
  // ,
  // { input: 'union', output: 'union' }
  // ,
  // { input: 'u-b-i-n-c', output: 'union' }
  // ,
  // { input: 'ubinr', output: 'union' }
  // ,
  // { input: 'ub-inr', output: 'union' }
  // ,
  // { input: 'ubinc', output: 'union' }
  // ,
  // { input: 'u.b.i.n.r', output: 'union' }
  // ,
  // { input: 'un ion', output: 'union' }
  // ,
  // { input: 'union bank', output: 'union' }
  // ,
  // { input: 'u b i n r', output: 'union' }
  // ,
  // { input: 'union', output: 'union' }
  // ,
  // { input: 'ub.i.nc', output: 'union' }
  // ,
  // { input: 'ubinc', output: 'union' }
  // ,
  // { input: 'u_b_i_n-r', output: 'union' }
  // ,
  // { input: 'union', output: 'union' }
  // ,
  // { input: 'u b i n c', output: 'union' }
  // ,
  // { input: 'un_ion', output: 'union' }
  // ,
  // { input: 'union bank', output: 'union' }
  // ,
  // { input: 'u_b_i_n-r', output: 'union' }
  // ,
  // { input: 'union', output: 'union' }
  // ,
  // { input: 'u-b-i-n-c', output: 'union' }
  // ,
  // { input: 'u.b.inc', output: 'union' }
  // ,
  // { input: 'ubinr', output: 'union' }
  // ,
  // { input: 'union', output: 'union' }
  // ,
  // { input: 'u b i n.r', output: 'union' }
  // ,
  // { input: 'union bank', output: 'union' }
  // ,
  // { input: 'u-b-i-n', output: 'union' }
  // ,
  // { input: 'union', output: 'union' }
  // ,
  // { input: 'u_b_i.n.c', output: 'union' }
  // ,
  // { input: 'ubinc', output: 'union' }
  // ,
  // { input: 'utk', output: 'utk' }
  // ,
  // { input: 'utk_bank', output: 'utk' }
  // ,
  // { input: 'utk.bank', output: 'utk' }
  // ,
  // { input: 'utk bank', output: 'utk' }
  // ,
  // { input: 'utkarsh_small_finance', output: 'utk' }
  // ,
  // { input: 'utkarsh.small.finance', output: 'utk' }
  // ,
  // { input: 'utkarsh small finance bank', output: 'utk' }
  // ,
  // { input: 'utkarsh small finance', output: 'utk' }
  // ,
  // { input: 'utksr', output: 'utk' }
  // ,
  // { input: 'utk_bank', output: 'utk' }
  // ,
  // { input: 'utk-bank', output: 'utk' }
  // ,
  // { input: 'utk bank', output: 'utk' }
  // ,
  // { input: 'utkarsh_small_finance', output: 'utk' }
  // ,
  // { input: 'utkarsh.small.finance', output: 'utk' }
  // ,
  // { input: 'utkarsh small finance bank', output: 'utk' }
  // ,
  // { input: 'utkarsh small finance', output: 'utk' }
  // ,
  // { input: 'utksr', output: 'utk' }
  // ,
  // { input: 'utk_bank', output: 'utk' }
  // ,
  // { input: 'utk_bank', output: 'utk' }
  // ,
  // { input: 'utk.bank', output: 'utk' }
  // ,
  // { input: 'utk bank', output: 'utk' }
  // ,
  // { input: 'utkarsh_small_finance', output: 'utk' }
  // ,
  // { input: 'utkarsh.small.finance', output: 'utk' }
  // ,
  // { input: 'utkarsh small finance bank', output: 'utk' }
  // ,
  // { input: 'utkarsh small finance', output: 'utk' }
  // ,
  // { input: 'utksr', output: 'utk' }
  // ,
  // { input: 'utk_bank', output: 'utk' }
  // ,
  // { input: 'utk_bank', output: 'utk' }
  // ,
  // { input: 'utk-bank', output: 'utk' }
  // ,
  // { input: 'utk bank', output: 'utk' }
  // ,
  // { input: 'utkarsh_small_finance', output: 'utk' }
  // ,
  // { input: 'utkarsh.small.finance', output: 'utk' }
  // ,
  // { input: 'utkarsh small finance bank', output: 'utk' }
  // ,
  // { input: 'utkarsh small finance', output: 'utk' }
  // ,
  // { input: 'utksr', output: 'utk' }
  // ,
  // { input: 'utk_bank', output: 'utk' }
  // ,
  // { input: 'utk-bank', output: 'utk' }
  // ,
  // { input: 'utk.bank', output: 'utk' }
  // ,
  // { input: 'utk bank', output: 'utk' }
  // ,
  // { input: 'utkarsh_small_finance', output: 'utk' }
  // ,
  // { input: 'utkarsh.small.finance', output: 'utk' }
  // ,
  // { input: 'utkarsh small finance bank', output: 'utk' }
  // ,
  // { input: 'utkarsh small finance', output: 'utk' }
  // ,
  // { input: 'utksr', output: 'utk' }
  // ,
  // { input: 'yes', output: 'yes' }
  // ,
  // { input: 'y_e_s', output: 'yes' }
  // ,
  // { input: 'ye.s', output: 'yes' }
  // ,
  // { input: 'yes ', output: 'yes' }
  // ,
  // { input: 'yes bank', output: 'yes' }
  // ,
  // { input: 'yes_b_n_k', output: 'yes' }
  // ,
  // { input: 'yes.bank', output: 'yes' }
  // ,
  // { input: 'yes  bank', output: 'yes' }
  // ,
  // { input: 'yesbc', output: 'yes' }
  // ,
  // { input: 'yes_b_c', output: 'yes' }
  // ,
  // { input: 'yes.bc', output: 'yes' }
  // ,
  // { input: 'yes  bc', output: 'yes' }
  // ,
  // { input: 'yesbr', output: 'yes' }
  // ,
  // { input: 'yes_b_r', output: 'yes' }
  // ,
  // { input: 'yes.br', output: 'yes' }
  // ,
  // { input: 'yes  br', output: 'yes' }
  // ,
  // { input: 'sbi', output: 'sbi' }
  // ,
  // { input: 's-bi', output: 'sbi' }
  // ,
  // { input: 'sbi_', output: 'sbi' }
  // ,
  // { input: 'sbi.', output: 'sbi' }
  // ,
  // { input: 'state bank of india', output: 'sbi' }
  // ,
  // { input: 'state_bank_of_india', output: 'sbi' }
  // ,
  // { input: 'state bank of india.', output: 'sbi' }
  // ,
  // { input: 'state bank of india-', output: 'sbi' }
  // ,
  // { input: 'sbinr', output: 'sbi' }
  // ,
  // { input: 'sb_n_r', output: 'sbi' }
  // ,
  // { input: 'sb.n.r', output: 'sbi' }
  // ,
  // { input: 'sb ri', output: 'sbi' }
  // ,
  // { input: 'sbi', output: 'sbi' }
  // ,
  // { input: 's-bi', output: 'sbi' }
  // ,
  // { input: 'sbi_', output: 'sbi' }
  // ,
  // { input: 'sbi.', output: 'sbi' }
  // ,
  // { input: 'state bank of india', output: 'sbi' }
  // ,
  // { input: 'state_bank_of_india', output: 'sbi' }
  // ,
  // { input: 'state bank of india.', output: 'sbi' }
  // ,
  // { input: 'state bank of india-', output: 'sbi' }
  // ,
  // { input: 'sbinr', output: 'sbi' }
  // ,
  // { input: 'sb_n_r', output: 'sbi' }
  // ,
  // { input: 'sb.n.r', output: 'sbi' }
  // ,
  // { input: 'sb ri', output: 'sbi' }
  // ,
  // { input: 's-bic', output: 'sbic' }
  // ,
  // { input: 'sbi_corporate', output: 'sbic' }
  // ,
  // { input: 'state.bank.of.india.corporate', output: 'sbic' }
  // ,
  // { input: ' s b i c', output: 'sbic' }
  // ,
  // { input: 'sb_i-c', output: 'sbic' }
  // ,
  // { input: '  sbic', output: 'sbic' }
  // ,
  // { input: 'sbi.corporate', output: 'sbic' }
  // ,
  // { input: 'state_bank_of_india_corporate', output: 'sbic' }
  // ,
  // { input: 's b i corporate', output: 'sbic' }
  // ,
  // { input: 'sbi-c', output: 'sbic' }
  // ,
  // { input: 'state-bank-of-india-corporate', output: 'sbic' }
  // ,
  // { input: ' sbinc', output: 'sbic' }
  // ,
  // { input: 'sbi_corporate', output: 'sbic' }
  // ,
  // { input: 's.b.i.c', output: 'sbic' }
  // ,
  // { input: 'sb inc', output: 'sbic' }
  // ,
  // { input: 'state.bank.of.india.corporate', output: 'sbic' }
  // ,
  // { input: 's.b.i.corporate', output: 'sbic' }
  // ,
  // { input: 'sb i c', output: 'sbic' }
  // ,
  // { input: 'sbi.corporate', output: 'sbic' }
  // ,
  // { input: ' s b i corporate', output: 'sbic' }
  // ,
  // { input: 's-bic', output: 'sbic' }
  // ,
  // { input: ' s b i.c', output: 'sbic' }
  // ,
  // { input: 'sb.i-c', output: 'sbic' }
  // ,
  // { input: ' sbinc', output: 'sbic' }
  // ,
  // { input: 'sbi_corporate', output: 'sbic' }
  // ,
  // { input: 'state.bank of india corporate', output: 'sbic' }
  // ,
  // { input: 's.b.i. corporate', output: 'sbic' }
  // ,
  // { input: 's.b.i_c', output: 'sbic' }
  // ,
  // { input: 'sbi corporate', output: 'sbic' }
  // ,
  // { input: 'state.bank of india-corporate', output: 'sbic' }
  // ,
  // { input: 'sbi_c', output: 'sbic' }
  // ,
  // { input: 'sbi-c', output: 'sbic' }
  // ,
  // { input: 'sb i.c', output: 'sbic' }
  // ,
  // { input: 'sbi corporate', output: 'sbic' }
  // ,
  // { input: ' state.bank of india corporate', output: 'sbic' }
  // ,
  // { input: 's b i c', output: 'sbic' }
  // ,
  // { input: 'sbinc', output: 'sbic' }
  // ,
  // { input: 's b i.corporate', output: 'sbic' }
  // ,
  // { input: 's-b.i.c', output: 'sbic' }
  // ,
  // { input: 'sbi.corporate', output: 'sbic' }
  // ,
  // { input: '-sbi', output: 'sbi' }
  // ,
  // { input: 'state bank of india.', output: 'sbi' }
  // ,
  // { input: 'sbinr', output: 'sbi' }
  // ,
  // { input: '_sbi', output: 'sbi' }
  // ,
  // { input: 'state bank of india', output: 'sbi' }
  // ,
  // { input: 'sbinr.', output: 'sbi' }
  // ,
  // { input: '.sbi', output: 'sbi' }
  // ,
  // { input: 'state bank of india-', output: 'sbi' }
  // ,
  // { input: 'sbinr ', output: 'sbi' }
  // ,
  // { input: ' sbi', output: 'sbi' }
  // ,
  // { input: 'state_bank_of_india', output: 'sbi' }
  // ,
  // { input: 'sbinr ', output: 'sbi' }
  // ,
  // { input: '.state bank of india', output: 'sbi' }
  // ,
  // { input: '_state bank of india', output: 'sbi' }
  // ,
  // { input: 'sbinr_', output: 'sbi' }
  // ,
  // { input: 'state .bank of india', output: 'sbi' }
  // ,
  // { input: '_sbinr', output: 'sbi' }
  // ,
  // { input: '.state bank of india_', output: 'sbi' }
  // ,
  // { input: '-state bank of india', output: 'sbi' }
  // ,
  // { input: 'state.bank_of.india', output: 'sbi' }
  // ,
  // { input: 'sbi ', output: 'sbi' }
  // ,
  // { input: '_sbinr_', output: 'sbi' }
  // ,
  // { input: '.sbi-', output: 'sbi' }
  // ,
  // { input: 'sbi-', output: 'sbi' }
  // ,
  // { input: '_state .bank of india ', output: 'sbi' }
  // ,
  // { input: ' state bank of india_', output: 'sbi' }
  // ,
  // { input: 'sbinr-of-india', output: 'sbi' }
  // ,
  // { input: 'state.bank_of.india', output: 'sbi' }
  // ,
  // { input: '_sbi-', output: 'sbi' }
  // ,
  // { input: 'sbi_of_india', output: 'sbi' }
  // ,
  // { input: '-state bank of india-', output: 'sbi' }
  // ,
  // { input: '_sbinr ', output: 'sbi' }
  // ,
  // { input: '.state_bank_of.india', output: 'sbi' }
  // ,
  // { input: '_state bank of india_', output: 'sbi' }
  // ,
  // { input: 'sbi.bank-of-india', output: 'sbi' }
  // ,
  // { input: ' state bank of india.', output: 'sbi' }
  // ,
  // { input: '_sbi ', output: 'sbi' }
  // ,
  // { input: '-.state bank of india', output: 'sbi' }
  // ,
  // { input: 'sbinr-.india', output: 'sbi' }
  // ,
  // { input: 'state.bank of india', output: 'sbi' }
  // ,
  // { input: 's-bic', output: 'sbic' }
  // ,
  // { input: 'sbi_corporate', output: 'sbic' }
  // ,
  // { input: 'state.bank.of.india.corporate', output: 'sbic' }
  // ,
  // { input: ' s b i c', output: 'sbic' }
  // ,
  // { input: 'sb_i-c', output: 'sbic' }
  // ,
  // { input: '  sbic', output: 'sbic' }
  // ,
  // { input: 'sbi.corporate', output: 'sbic' }
  // ,
  // { input: 'state_bank_of_india_corporate', output: 'sbic' }
  // ,
  // { input: 's b i corporate', output: 'sbic' }
  // ,
  // { input: 'sbi-c', output: 'sbic' }
  // ,
  // { input: 'state-bank-of-india-corporate', output: 'sbic' }
  // ,
  // { input: ' sbinc', output: 'sbic' }
  // ,
  // { input: 'sbi_corporate', output: 'sbic' }
  // ,
  // { input: 's.b.i.c', output: 'sbic' }
  // ,
  // { input: 'sb inc', output: 'sbic' }
  // ,
  // { input: 'state.bank.of.india.corporate', output: 'sbic' }
  // ,
  // { input: 's.b.i.corporate', output: 'sbic' }
  // ,
  // { input: 'sb i c', output: 'sbic' }
  // ,
  // { input: 'sbi.corporate', output: 'sbic' }
  // ,
  // { input: ' s b i corporate', output: 'sbic' }
  // ,
  // { input: 's-bic', output: 'sbic' }
  // ,
  // { input: ' s b i.c', output: 'sbic' }
  // ,
  // { input: 'sb.i-c', output: 'sbic' }
  // ,
  // { input: ' sbinc', output: 'sbic' }
  // ,
  // { input: 'sbi_corporate', output: 'sbic' }
  // ,
  // { input: 'state.bank of india corporate', output: 'sbic' }
  // ,
  // { input: 's.b.i. corporate', output: 'sbic' }
  // ,
  // { input: 's.b.i_c', output: 'sbic' }
  // ,
  // { input: 'sbi corporate', output: 'sbic' }
  // ,
  // { input: 'state.bank of india-corporate', output: 'sbic' }
  // ,
  // { input: 'sbi_c', output: 'sbic' }
  // ,
  // { input: 'sbi-c', output: 'sbic' }
  // ,
  // { input: 'sb i.c', output: 'sbic' }
  // ,
  // { input: 'sbi corporate', output: 'sbic' }
  // ,
  // { input: ' state.bank of india corporate', output: 'sbic' }
  // ,
  // { input: 's b i c', output: 'sbic' }
  // ,
  // { input: 'sbinc', output: 'sbic' }
  // ,
  // { input: 's b i.corporate', output: 'sbic' }
  // ,
  // { input: 's-b.i.c', output: 'sbic' }
  // ,
  // { input: 'sbi.corporate', output: 'sbic' }
  // ,
]

initialData = [...initialData, ...generatedData];
initialData = shuffleArray(initialData);

console.log("data", initialData);
const inputs = initialData.map(entry => entry.input);
const outputs = initialData.map(entry => banks.indexOf(entry.output));

const splitIndex = Math.floor(0.95 * initialData.length);
const trainingData = inputs.slice(0, splitIndex);
const trainingOutput = outputs.slice(0, splitIndex);
const testingData = inputs.slice(splitIndex);
// const testingData = generatedData.map(entry => entry.input);

const labelsOneHot = tf.oneHot(tf.tensor1d(trainingOutput, 'int32'), 48);

// Model details
const model = tf.sequential();

model.add(tf.layers.dense({ units: 128, activation: 'relu', inputShape: [512] }));
model.add(tf.layers.dense({ units: 75, activation: 'relu' }));
model.add(tf.layers.dense({ units: 48, activation: 'softmax' }));

model.compile({ optimizer: 'adam', loss: 'categoricalCrossentropy', metrics: ['accuracy'] });

// Encoding
const encodeData = data => {
  const sentences = data.map(element => element.toLowerCase());

  const trainingData = use.load().then(model => {
    const embeddings = model.embed(sentences);
    return embeddings;
  }).catch(err => console.error('Fit Error:', err));

  return trainingData
};

function onBatchEnd(batch, logs) {
  console.log('Accuracy', logs);
}


function run() {
  Promise.all([
    encodeData(trainingData),
    encodeData(testingData)
  ]).then(data => {
    const {
      0: training_data,
      1: testing_data,
    } = data;
    model.fit(training_data, labelsOneHot, { epochs: 100, callbacks: { onBatchEnd }, })
      .then(async info => {
        console.log('Final accuracy', info.history.acc);
        const predictions = model.predict(testing_data);

        // If you want to extract the predicted class indices for each example
        const predictedClassIndices = predictions.argMax(1).dataSync();
        console.log('Predicted Class Indices:', predictedClassIndices);

        let total = 0;
        for (let i = 0; i < testingData.length; i += 1) {
          const actualValue = initialData.find(obj => obj.input === testingData[i]).output
          // console.log("actualValue", actualValue)
          if (banks[predictedClassIndices[i]] == actualValue)
            total += 1;
          console.log(testingData[i] + ": " + banks[predictedClassIndices[i]])
        }
        console.log("Accuracy: ", total / testingData.length * 100);
        saveModel();
      });
  })
}

module.exports = run();

async function saveModel() {
  try {
    const saveResult = await model.save('file:///WEB/ml model/ml-model');

    if (saveResult.errors) {
      console.error('Failed to save the model:', saveResult.errors);
    } else {
      console.log('Model saved successfully!');
    }
  } catch (error) {
    console.error('Error during model saving:', error);
  }
}