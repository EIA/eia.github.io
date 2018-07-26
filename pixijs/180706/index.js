var device;
if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  device = 'mobile';
} else {
  device = 'pc';
}

////////////////////////////////////////////////////////////////////////////////////////

var dData =
[
	[0, 0, 0, -61.3, 15.8, -59],
	[0, 0, 15.8, -59, 30.85, -52.75],
	[0, 0, 30.85, -52.75, 43.9, -42.75],
	[0, 0, 43.9, -42.75, 53, -30.6],
	[0, 0, 53, -30.6, 59.1, -15.85],
	[0, 0, 59.1, -15.85, 61.65, 0],
	[0, 0, 61.65, 0, 59.1, 15.95],
	[0, 0, 59.1, 15.95, 53, 30.85],
	[0, 0, 53, 30.85, 42.95, 43.6],
	[0, 0, 42.95, 43.6, 30.85, 53.6],
	[0, 0, 30.85, 53.6, 15.35, 59.15],
	[0, 0, 15.35, 59.15, 0, 61.2],
	[0, 0, 0, 61.2, -15.85, 58.5],
	[0, 0, -15.85, 58.5, -30.45, 52.5],
	[0, 0, -30.45, 52.5, -43.25, 43.2],
	[0, 0, -43.25, 43.2, -53.15, 30.65],
	[0, 0, -53.15, 30.65, -59.15, 16.05],
	[0, 0, -59.15, 16.05, -61.1, 0],
	[0, 0, -61.1, 0, -59.25, -15.95],
	[0, 0, -59.25, -15.95, -53.35, -31.1],
	[0, 0, -53.35, -31.1, -43.15, -43.2],
	[0, 0, -43.15, -43.2, -30.35, -53.15],
	[0, 0, -30.35, -53.15, -15.85, -59.05],
	[0, 0, -15.85, -59.05, 0, -61.3],
	[0, -61.3, 15.8, -59, 22.2, -82.6, 0, -85.45],
	[15.8, -59, 30.85, -52.75, 42.85, -73.75, 22.2, -82.6],
	[30.85, -52.75, 43.9, -42.75, 60.25, -60.1, 42.85, -73.75],
	[43.9, -42.75, 53, -30.6, 73.85, -42.75, 60.25, -60.1],
	[53, -30.6, 59.1, -15.85, 82.55, -22, 73.85, -42.75],
	[59.1, -15.85, 61.65, 0, 85.3, 0, 82.55, -22],
	[61.65, 0, 59.1, 15.95, 82.55, 22.05, 85.3, 0],
	[59.1, 15.95, 53, 30.85, 71.55, 41.5, 82.55, 22.05],
	[53, 30.85, 42.95, 43.6, 60.25, 60.45, 71.55, 41.5],
	[42.95, 43.6, 30.85, 53.6, 42.95, 73.8, 60.25, 60.45],
	[30.85, 53.6, 15.35, 59.15, 21.9, 82.3, 42.95, 73.8],
	[15.35, 59.15, 0, 61.2, 0, 85.55, 21.9, 82.3],
	[0, 61.2, -15.85, 58.5, -21.05, 83.4, 0, 85.55],
	[-15.85, 58.5, -30.45, 52.5, -42.55, 73.65, -21.05, 83.4],
	[-30.45, 52.5, -43.25, 43.2, -60.15, 60.45, -42.55, 73.65],
	[-43.25, 43.2, -53.15, 30.65, -74, 43, -60.15, 60.45],
	[-53.15, 30.65, -59.15, 16.05, -82.3, 22.05, -74, 43],
	[-59.15, 16.05, -61.1, 0, -85.4, 0, -82.3, 22.05],
	[-61.1, 0, -59.25, -15.95, -82.4, -22.1, -85.4, 0],
	[-59.25, -15.95, -53.35, -31.1, -73.9, -42.7, -82.4, -22.1],
	[-53.35, -31.1, -43.15, -43.2, -60.2, -60.1, -73.9, -42.7],
	[-43.15, -43.2, -30.35, -53.15, -42.65, -73.8, -60.2, -60.1],
	[-30.35, -53.15, -15.85, -59.05, -22.25, -82.1, -42.65, -73.8],
	[-15.85, -59.05, 0, -61.3, 0, -85.45, -22.25, -82.1],
	[0, -85.45, 22.2, -82.6, 28.8, -107.75, 0, -111.45],
	[22.2, -82.6, 42.85, -73.75, 55.65, -96.4, 28.8, -107.75],
	[42.85, -73.75, 60.25, -60.1, 78.65, -78.75, 55.65, -96.4],
	[60.25, -60.1, 73.85, -42.75, 96.5, -55.45, 78.65, -78.75],
	[73.85, -42.75, 82.55, -22, 107.5, -28.85, 96.5, -55.45],
	[82.55, -22, 85.3, 0, 111.4, 0, 107.5, -28.85],
	[85.3, 0, 82.55, 22.05, 107.6, 28.8, 111.4, 0],
	[82.55, 22.05, 71.55, 41.5, 96.5, 55.7, 107.6, 28.8],
	[71.55, 41.5, 60.25, 60.45, 78.75, 78.75, 96.5, 55.7],
	[60.25, 60.45, 42.95, 73.8, 55.65, 96.1, 78.75, 78.75],
	[42.95, 73.8, 21.9, 82.3, 28.8, 107.8, 55.65, 96.1],
	[21.9, 82.3, 0, 85.55, 0, 111.4, 28.8, 107.8],
	[0, 85.55, -21.05, 83.4, -28.2, 107.8, 0, 111.4],
	[-21.05, 83.4, -42.55, 73.65, -55.85, 96.45, -28.2, 107.8],
	[-42.55, 73.65, -60.15, 60.45, -78.95, 79, -55.85, 96.45],
	[-60.15, 60.45, -74, 43, -96.25, 55.6, -78.95, 79],
	[-74, 43, -82.3, 22.05, -107.45, 28.8, -96.25, 55.6],
	[-82.3, 22.05, -85.4, 0, -111.45, 0, -107.45, 28.8],
	[-85.4, 0, -82.4, -22.1, -107.45, -28.85, -111.45, 0],
	[-82.4, -22.1, -73.9, -42.7, -96.25, -55.35, -107.45, -28.85],
	[-73.9, -42.7, -60.2, -60.1, -78.6, -78.75, -96.25, -55.35],
	[-60.2, -60.1, -42.65, -73.8, -55.8, -96.35, -78.6, -78.75],
	[-42.65, -73.8, -22.25, -82.1, -28.8, -107.75, -55.8, -96.35],
	[-22.25, -82.1, 0, -85.45, 0, -111.45, -28.8, -107.75],
	[0, -111.45, 28.8, -107.75, 34.65, -129.35, 0, -129.35],
	[28.8, -107.75, 55.65, -96.4, 74.6, -129.4, 34.65, -129.35],
	[55.65, -96.4, 78.65, -78.75, 94.7, -94.5, 74.6, -129.4],
	[78.65, -78.75, 96.5, -55.45, 112.05, -64.45, 94.7, -94.5],
	[96.5, -55.45, 107.5, -28.85, 129.45, -34.65, 112.05, -64.45],
	[107.5, -28.85, 111.4, 0, 149.2, 0, 129.45, -34.65],
	[111.4, 0, 107.6, 28.8, 129.4, 34.35, 149.2, 0],
	[107.6, 28.8, 96.5, 55.7, 111.95, 64.75, 129.4, 34.35],
	[96.5, 55.7, 78.75, 78.75, 94.55, 94.8, 111.95, 64.75],
	[78.75, 78.75, 55.65, 96.1, 75.05, 129.95, 94.55, 94.8],
	[55.65, 96.1, 28.8, 107.8, 34.7, 129.3, 75.05, 129.95],
	[28.8, 107.8, 0, 111.4, 0, 129.3, 34.7, 129.3],
	[0, 111.4, -28.2, 107.8, -34.6, 129.3, 0, 129.3],
	[-28.2, 107.8, -55.85, 96.45, -74.4, 129.3, -34.6, 129.3],
	[-55.85, 96.45, -78.95, 79, -94.65, 94.7, -74.4, 129.3],
	[-78.95, 79, -96.25, 55.6, -112.25, 64.75, -94.65, 94.7],
	[-96.25, 55.6, -107.45, 28.8, -129.45, 34.75, -112.25, 64.75],
	[-107.45, 28.8, -111.45, 0, -149.6, 0, -129.45, 34.75],
	[-111.45, 0, -107.45, -28.85, -129.45, -34.65, -149.6, 0],
	[-107.45, -28.85, -96.25, -55.35, -112.05, -64.7, -129.45, -34.65],
	[-96.25, -55.35, -78.6, -78.75, -94.6, -94.55, -112.05, -64.7],
	[-78.6, -78.75, -55.8, -96.35, -75.2, -129.4, -94.6, -94.55],
	[-55.8, -96.35, -28.8, -107.75, -34.6, -129.35, -75.2, -129.4],
	[-28.8, -107.75, 0, -111.45, 0, -129.35, -34.6, -129.35],
	[0, -129.35, 34.65, -129.35, 40.1, -150.4, 0, -172.8],
	[34.65, -129.35, 74.6, -129.4, 40.1, -150.4],
	[74.6, -129.4, 94.7, -94.5, 110.9, -110.5],
	[94.7, -94.5, 112.05, -64.45, 150.15, -86.2, 110.9, -110.5],
	[112.05, -64.45, 129.45, -34.65, 150.2, -39.95, 150.15, -86.2],
	[129.45, -34.65, 149.2, 0, 150.2, -39.95],
	[149.2, 0, 129.4, 34.35, 150.2, 40.3],
	[129.4, 34.35, 111.95, 64.75, 149.85, 86.4, 150.2, 40.3],
	[111.95, 64.75, 94.55, 94.8, 109.45, 109.75, 149.85, 86.4],
	[94.55, 94.8, 75.05, 129.95, 109.45, 109.75],
	[75.05, 129.95, 34.7, 129.3, 40.2, 150.05],
	[34.7, 129.3, 0, 129.3, 0, 172.65, 40.2, 150.05],
	[0, 129.3, -34.6, 129.3, -40.05, 149.2, 0, 172.65],
	[-34.6, 129.3, -74.4, 129.3, -40.05, 149.2],
	[-74.4, 129.3, -94.65, 94.7, -109.1, 109.35],
	[-94.65, 94.7, -112.25, 64.75, -149.6, 86.65, -109.1, 109.35],
	[-112.25, 64.75, -129.45, 34.75, -149.6, 40.3, -149.6, 86.65],
	[-129.45, 34.75, -149.6, 0, -149.6, 40.3],
	[-149.6, 0, -129.45, -34.65, -149.6, -40.2],
	[-129.45, -34.65, -112.05, -64.7, -149.8, -86.55, -149.6, -40.2],
	[-112.05, -64.7, -94.6, -94.55, -110.1, -109.85, -149.8, -86.55],
	[-94.6, -94.55, -75.2, -129.4, -110.1, -109.85],
	[-75.2, -129.4, -34.6, -129.35, -40.1, -149.4],
	[-34.6, -129.35, 0, -129.35, 0, -172.8, -40.1, -149.4],
	[0, -172.8, 40.1, -150.4, 58.2, -217.1, 0, -216.4],
	[40.1, -150.4, 74.6, -129.4, 109.15, -188.95, 58.2, -217.1],
	[74.6, -129.4, 110.9, -110.5, 159.45, -159.5, 109.15, -188.95],
	[110.9, -110.5, 150.15, -86.2, 187.45, -107.95, 159.45, -159.5],
	[150.15, -86.2, 150.2, -39.95, 218.25, -58.45, 187.45, -107.95],
	[150.2, -39.95, 149.2, 0, 217.95, 0, 218.25, -58.45],
	[149.2, 0, 150.2, 40.3, 218.25, 58.4, 217.95, 0],
	[150.2, 40.3, 149.85, 86.4, 187.45, 108.35, 218.25, 58.4],
	[149.85, 86.4, 109.45, 109.75, 158.55, 158.65, 187.45, 108.35],
	[109.45, 109.75, 75.05, 129.95, 108.35, 188.3, 158.55, 158.65],
	[75.05, 129.95, 40.2, 150.05, 58.05, 216.55, 108.35, 188.3],
	[40.2, 150.05, 0, 172.65, 0, 216.35, 58.05, 216.55],
	[0, 172.65, -40.05, 149.2, -57.6, 216.75, 0, 216.35],
	[-40.05, 149.2, -74.4, 129.3, -108.7, 188.1, -57.6, 216.75],
	[-74.4, 129.3, -109.1, 109.35, -158.65, 158.65, -108.7, 188.1],
	[-109.1, 109.35, -149.6, 86.65, -187.2, 108.25, -158.65, 158.65],
	[-149.6, 86.65, -149.6, 40.3, -216.7, 58.2, -187.2, 108.25],
	[-149.6, 40.3, -149.6, 0, -217.5, 0, -216.7, 58.2],
	[-149.6, 0, -149.6, -40.2, -216.7, -58.1, -217.5, 0],
	[-149.6, -40.2, -149.8, -86.55, -187.2, -107.95, -216.7, -58.1],
	[-149.8, -86.55, -110.1, -109.85, -158.65, -158.7, -187.2, -107.95],
	[-110.1, -109.85, -75.2, -129.4, -109.3, -188.55, -158.65, -158.7],
	[-75.2, -129.4, -40.1, -149.4, -58.05, -217.1, -109.3, -188.55],
	[-40.1, -149.4, 0, -172.8, 0, -216.4, -58.05, -217.1],
	[0, -216.4, 58.2, -217.1, 0, -251.15],
	[58.2, -217.1, 109.15, -188.95, 124.75, -216.25],
	[109.15, -188.95, 159.45, -159.5, 124.75, -216.25],
	[159.45, -159.5, 187.45, -107.95, 217.85, -125.95],
	[187.45, -107.95, 218.25, -58.45, 217.85, -125.95],
	[218.25, -58.45, 217.95, 0, 249.55, 0],
	[217.95, 0, 218.25, 58.4, 249.55, 0],
	[218.25, 58.4, 187.45, 108.35, 217.85, 125.25],
	[187.45, 108.35, 158.55, 158.65, 217.85, 125.25],
	[158.55, 158.65, 108.35, 188.3, 124.75, 216.35],
	[108.35, 188.3, 58.05, 216.55, 124.75, 216.35],
	[58.05, 216.55, 0, 216.35, 0, 251],
	[0, 216.35, -57.6, 216.75, 0, 251],
	[-57.6, 216.75, -108.7, 188.1, -124.3, 216.35],
	[-108.7, 188.1, -158.65, 158.65, -124.3, 216.35],
	[-158.65, 158.65, -187.2, 108.25, -215.5, 124.25],
	[-187.2, 108.25, -216.7, 58.2, -215.5, 124.25],
	[-216.7, 58.2, -217.5, 0, -249.8, 0],
	[-217.5, 0, -216.7, -58.1, -249.8, 0],
	[-216.7, -58.1, -187.2, -107.95, -217.5, -125.75],
	[-187.2, -107.95, -158.65, -158.7, -217.5, -125.75],
	[-158.65, -158.7, -109.3, -188.55, -125.25, -216.25],
	[-109.3, -188.55, -58.05, -217.1, -125.25, -216.25],
	[-58.05, -217.1, 0, -216.4, 0, -251.15],
	[0, -251.15, 58.2, -217.1, 82.4, -308.4, 0, -329.7],
	[58.2, -217.1, 124.75, -216.25, 164.25, -284.8, 82.4, -308.4],
	[124.75, -216.25, 159.45, -159.5, 221.9, -223.6, 164.25, -284.8],
	[159.45, -159.5, 217.85, -125.95, 285.35, -164.4, 221.9, -223.6],
	[217.85, -125.95, 218.25, -58.45, 307.55, -82.35, 285.35, -164.4],
	[218.25, -58.45, 249.55, 0, 329.5, 0, 307.55, -82.35],
	[249.55, 0, 218.25, 58.4, 307.75, 82.4, 329.5, 0],
	[218.25, 58.4, 217.85, 125.25, 284.55, 164.05, 307.75, 82.4],
	[217.85, 125.25, 158.55, 158.65, 224.7, 224.25, 284.55, 164.05],
	[158.55, 158.65, 124.75, 216.35, 164.05, 285.25, 224.7, 224.25],
	[124.75, 216.35, 58.05, 216.55, 82.25, 308, 164.05, 285.25],
	[58.05, 216.55, 0, 251, 0, 329.65, 82.25, 308],
	[0, 251, -57.6, 216.75, -82.3, 307.65, 0, 329.65],
	[-57.6, 216.75, -124.3, 216.35, -164.4, 284.45, -82.3, 307.65],
	[-124.3, 216.35, -158.65, 158.65, -224.2, 224.05, -164.4, 284.45],
	[-158.65, 158.65, -215.5, 124.25, -285, 164.9, -224.2, 224.05],
	[-215.5, 124.25, -216.7, 58.2, -307.2, 82.3, -285, 164.9],
	[-216.7, 58.2, -249.8, 0, -329.7, 0, -307.2, 82.3],
	[-249.8, 0, -216.7, -58.1, -307.2, -82.3, -329.7, 0],
	[-216.7, -58.1, -217.5, -125.75, -285, -164.5, -307.2, -82.3],
	[-217.5, -125.75, -158.65, -158.7, -224.2, -224.45, -285, -164.5],
	[-158.65, -158.7, -125.25, -216.25, -164.8, -285.55, -224.2, -224.45],
	[-125.25, -216.25, -58.05, -217.1, -82.55, -308, -164.8, -285.55],
	[-58.05, -217.1, 0, -251.15, 0, -329.7, -82.55, -308],
	[0, -329.7, 82.4, -308.4, 95.3, -354.75],
	[82.4, -308.4, 164.25, -284.8, 95.3, -354.75],
	[164.25, -284.8, 221.9, -223.6, 261.1, -260.35],
	[221.9, -223.6, 285.35, -164.4, 261.1, -260.35],
	[285.35, -164.4, 307.55, -82.35, 353.9, -94.7],
	[307.55, -82.35, 329.5, 0, 353.9, -94.7],
	[329.5, 0, 307.75, 82.4, 354.1, 94.75],
	[307.75, 82.4, 284.55, 164.05, 354.1, 94.75],
	[284.55, 164.05, 224.7, 224.25, 261.1, 260.45],
	[224.7, 224.25, 164.05, 285.25, 261.1, 260.45],
	[164.05, 285.25, 82.25, 308, 93.75, 354],
	[82.25, 308, 0, 329.65, 93.75, 354],
	[0, 329.65, -82.3, 307.65, -94.8, 354],
	[-82.3, 307.65, -164.4, 284.45, -94.8, 354],
	[-164.4, 284.45, -224.2, 224.05, -260.4, 260.45],
	[-224.2, 224.05, -285, 164.9, -260.4, 260.45],
	[-285, 164.9, -307.2, 82.3, -354.4, 94.7],
	[-307.2, 82.3, -329.7, 0, -354.4, 94.7],
	[-329.7, 0, -307.2, -82.3, -354.4, -94.95],
	[-307.2, -82.3, -285, -164.5, -354.4, -94.95],
	[-285, -164.5, -224.2, -224.45, -260.4, -260.35],
	[-224.2, -224.45, -164.8, -285.55, -260.4, -260.35],
	[-164.8, -285.55, -82.55, -308, -95.4, -354.75],
	[-82.55, -308, 0, -329.7, -95.4, -354.75],
	[0, -329.7, 95.3, -354.75, 0, -448.8],
	[95.3, -354.75, 164.25, -284.8, 225.25, -390],
	[164.25, -284.8, 261.1, -260.35, 225.25, -390],
	[261.1, -260.35, 285.35, -164.4, 389.4, -224.45],
	[285.35, -164.4, 353.9, -94.7, 389.4, -224.45],
	[353.9, -94.7, 329.5, 0, 448.2, 0],
	[329.5, 0, 354.1, 94.75, 448.2, 0],
	[354.1, 94.75, 284.55, 164.05, 388.6, 224.7],
	[284.55, 164.05, 261.1, 260.45, 388.6, 224.7],
	[261.1, 260.45, 164.05, 285.25, 224.7, 389.7],
	[164.05, 285.25, 93.75, 354, 224.7, 389.7],
	[93.75, 354, 0, 329.65, 0, 448.1],
	[0, 329.65, -94.8, 354, 0, 448.1],
	[-94.8, 354, -164.4, 284.45, -225.3, 390.2],
	[-164.4, 284.45, -260.4, 260.45, -225.3, 390.2],
	[-260.4, 260.45, -285, 164.9, -388.8, 224.7],
	[-285, 164.9, -354.4, 94.7, -388.8, 224.7],
	[-354.4, 94.7, -329.7, 0, -447.8, 0],
	[-329.7, 0, -354.4, -94.95, -447.8, 0],
	[-354.4, -94.95, -285, -164.5, -388.8, -224.45],
	[-285, -164.5, -260.4, -260.35, -388.8, -224.45],
	[-260.4, -260.35, -164.8, -285.55, -225.3, -390],
	[-164.8, -285.55, -95.4, -354.75, -225.3, -390],
	[-95.4, -354.75, 0, -329.7, 0, -448.8],
	[0, -448.8, 95.3, -354.75, 120.85, -450.4],
	[95.3, -354.75, 225.25, -390, 120.85, -450.4],
	[225.25, -390, 261.1, -260.35, 328.7, -328.9],
	[261.1, -260.35, 389.4, -224.45, 328.7, -328.9],
	[389.4, -224.45, 353.9, -94.7, 449.3, -120.05],
	[353.9, -94.7, 448.2, 0, 449.3, -120.05],
	[448.2, 0, 354.1, 94.75, 449.3, 120.6],
	[354.1, 94.75, 388.6, 224.7, 449.3, 120.6],
	[388.6, 224.7, 261.1, 260.45, 328.7, 328.7],
	[261.1, 260.45, 224.7, 389.7, 328.7, 328.7],
	[224.7, 389.7, 93.75, 354, 120.85, 449.2],
	[93.75, 354, 0, 448.1, 120.85, 449.2],
	[0, 448.1, -94.8, 354, -120, 449.2],
	[-94.8, 354, -225.3, 390.2, -120, 449.2],
	[-225.3, 390.2, -260.4, 260.45, -328.3, 328.7],
	[-260.4, 260.45, -388.8, 224.7, -328.3, 328.7],
	[-388.8, 224.7, -354.4, 94.7, -448.6, 119.95],
	[-354.4, 94.7, -447.8, 0, -448.6, 119.95],
	[-447.8, 0, -354.4, -94.95, -449.3, -120.45],
	[-354.4, -94.95, -388.8, -224.45, -449.3, -120.45],
	[-388.8, -224.45, -260.4, -260.35, -328.3, -328.2],
	[-260.4, -260.35, -225.3, -390, -328.3, -328.2],
	[-225.3, -390, -95.4, -354.75, -121, -450.4],
	[-95.4, -354.75, 0, -448.8, -121, -450.4],
	[0, -448.8, 120.85, -450.4, 0, -520.3],
	[120.85, -450.4, 225.25, -390, 260.45, -450.8],
	[225.25, -390, 328.7, -328.9, 260.45, -450.8],
	[328.7, -328.9, 389.4, -224.45, 450.4, -260.35],
	[389.4, -224.45, 449.3, -120.05, 450.4, -260.35],
	[449.3, -120.05, 448.2, 0, 517.6, 0],
	[448.2, 0, 449.3, 120.6, 517.6, 0],
	[449.3, 120.6, 388.6, 224.7, 450.4, 260.05],
	[388.6, 224.7, 328.7, 328.7, 450.4, 260.05],
	[328.7, 328.7, 224.7, 389.7, 259.55, 448.8],
	[224.7, 389.7, 120.85, 449.2, 259.55, 448.8],
	[120.85, 449.2, 0, 448.1, 0, 519.8],
	[0, 448.1, -120, 449.2, 0, 519.8],
	[-120, 449.2, -225.3, 390.2, -259.4, 449.2],
	[-225.3, 390.2, -328.3, 328.7, -259.4, 449.2],
	[-328.3, 328.7, -388.8, 224.7, -449.3, 259.45],
	[-388.8, 224.7, -448.6, 119.95, -449.3, 259.45],
	[-448.6, 119.95, -447.8, 0, -518.1, 0],
	[-447.8, 0, -449.3, -120.45, -518.1, 0],
	[-449.3, -120.45, -388.8, -224.45, -450.1, -259.9],
	[-388.8, -224.45, -328.3, -328.2, -450.1, -259.9],
	[-328.3, -328.2, -225.3, -390, -258.5, -448.4],
	[-225.3, -390, -121, -450.4, -258.5, -448.4],
	[-121, -450.4, 0, -448.8, 0, -520.3],
	[0, -520.3, 120.85, -450.4, 134.35, -502.6],
	[120.85, -450.4, 260.45, -450.8, 134.35, -502.6],
	[260.45, -450.8, 328.7, -328.9, 367.8, -368.1],
	[328.7, -328.9, 450.4, -260.35, 367.8, -368.1],
	[450.4, -260.35, 449.3, -120.05, 502.6, -134.55],
	[449.3, -120.05, 517.6, 0, 502.6, -134.55],
	[517.6, 0, 449.3, 120.6, 502.6, 134.7],
	[449.3, 120.6, 450.4, 260.05, 502.6, 134.7],
	[450.4, 260.05, 328.7, 328.7, 368.2, 367.9],
	[328.7, 328.7, 259.55, 448.8, 368.2, 367.9],
	[259.55, 448.8, 120.85, 449.2, 134.75, 502.5],
	[120.85, 449.2, 0, 519.8, 134.75, 502.5],
	[0, 519.8, -120, 449.2, -134.9, 502.5],
	[-120, 449.2, -259.4, 449.2, -134.9, 502.5],
	[-259.4, 449.2, -328.3, 328.7, -367.7, 367.9],
	[-328.3, 328.7, -449.3, 259.45, -367.7, 367.9],
	[-449.3, 259.45, -448.6, 119.95, -502.5, 134.5],
	[-448.6, 119.95, -518.1, 0, -502.5, 134.5],
	[-518.1, 0, -449.3, -120.45, -502.5, -134.55],
	[-449.3, -120.45, -450.1, -259.9, -502.5, -134.55],
	[-450.1, -259.9, -328.3, -328.2, -368.1, -367.7],
	[-328.3, -328.2, -258.5, -448.4, -368.1, -367.7],
	[-258.5, -448.4, -121, -450.4, -134.9, -502.8],
	[-121, -450.4, 0, -520.3, -134.9, -502.8],
];


// --------------------------------------------------------------------------- //


var testData = [

					{title:'Title1', desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et dolor eu nulla molestie mollis quis et ante. Praesent sed scelerisque nibh. Cras nec placerat urna, quis aliquet felis. Aenean elementum turpis eget magna convallis, quis consequat turpis porta.'},
					{title:'Title2', desc:'Sed posuere lacus velit, eu vestibulum nisl semper at. In at turpis vitae leo semper dapibus mattis sit amet urna. Pellentesque pretium nunc lectus, ac ultricies purus dictum ac. Donec et nulla erat. Suspendisse blandit ultricies sem et consequat. Nunc facilisis mauris non porttitor semper.'},
					{title:'Title3', desc:'Fusce lectus felis, laoreet ac sollicitudin a, efficitur vitae purus. Curabitur lacinia fermentum risus, vitae congue lectus ornare sit amet. Maecenas tellus leo, porttitor nec magna id, bibendum tempus erat. Cras sed molestie quam. Maecenas venenatis leo aliquam metus congue pulvinar.'},
					{title:'Title4', desc:'Curabitur risus augue, viverra eget lacus ac, laoreet luctus massa. Donec tortor arcu, commodo sed faucibus a, vestibulum non velit. Quisque semper nisi et nunc tempor efficitur. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;'},
					{title:'Title5', desc:'Phasellus est nisi, hendrerit vel dui non, egestas dapibus odio. Proin molestie rhoncus placerat. Suspendisse lectus lacus, scelerisque sit amet euismod non, tempus eu metus. Ut dignissim urna dolor, in finibus massa commodo id. Aenean feugiat finibus ultrices. Curabitur ac ultrices velit.'}

				]








var app = new PIXI.Application(800, 600, {backgroundColor : 0xdddddd, antialias: true});
document.body.appendChild(app.view);

var diamondContainer = new PIXI.Container();
var centerContainer = new PIXI.Container();
var diamondData = [];

centerContainer.x = app.renderer.width / 2;
centerContainer.y = app.renderer.height / 2;

app.stage.addChild(centerContainer);
centerContainer.addChild(diamondContainer);


var PC_DATA = {
				stageScale: 0.85,
				openScale: 2
				};
var MOB_DATA = {
				stageScale: 0.35, //0.85
				openScale: 2
				};

if(device == 'pc'){
	centerContainer.scale.x = centerContainer.scale.y = PC_DATA.stageScale;
}else{
	centerContainer.scale.x = centerContainer.scale.y = MOB_DATA.stageScale;
}


var moveSpData = [];
var clickID = 0;
var inValue = 0;
var openValue = 0, movePos1 = 0, movePos2 = 0;

var contentBd;

function initView(){
	for(var i = 0; i< dData.length; i++){
		var diamondGraphics = new PIXI.Graphics();
		diamondContainer.addChild(diamondGraphics);
		diamondData.push(diamondGraphics);
		diamondGraphics.interactive = diamondGraphics.buttonMode = true;
		diamondGraphics.e_data = {
			id: i,
			ct_x: 0,
			ct_y: 0,
			inAlpha: Math.random()*8 - 8.5, // -8.5 ~ 0.5
			inAlphaSp: Math.random() * 14 + 2  // 2 ~16
		};
		diamondGraphics.on('pointerdown', clickDiamond);

		/* remove after19
		if(device == 'pc'){
			var graphicMask = new PIXI.Graphics();
			diamondContainer.addChild(graphicMask);
		}
		*/

		var moveGraphicsContainer = new PIXI.Container();
		diamondContainer.addChild(moveGraphicsContainer);


		var moveGraphics = new PIXI.Graphics();
		moveGraphicsContainer.addChild(moveGraphics);

		var tmpRandomShapeColor = Math.random()*60 - 120;
		tmpRandomShapeColor = tmpRandomShapeColor < 0 ? tmpRandomShapeColor + 360 : tmpRandomShapeColor;

		// v1
		// var randomLineColorArray = hsvToRGB2(tmpRandomShapeColor, .9, 0.95);

		// v2
		// var randomLineColorArray = hsvToRGB2(tmpRandomShapeColor, .9, Math.random()* 0.8 + 0.2);

		// v3
		var randomLineColorArray = hsvToRGB2(tmpRandomShapeColor, Math.random()* 0.3 + 0.7, Math.random()* 0.3 + 0.7);
		var randomLineColor = randomLineColorArray[0] * 256 * 256 + randomLineColorArray[1] * 256 + randomLineColorArray[2];
		diamondGraphics.beginFill(randomLineColor, Math.random() *0.95 + 0.05);

		/* remove after19
		if(device == 'pc'){
			graphicMask.beginFill(0x000000, Math.random() *0.95 + 0.05);
		}
		*/
	
		// moveGraphics.beginFill(0xffffff, Math.random()*0.7+0.3);
		moveGraphics.beginFill(0xffffff, Math.random()*0.5+0.5);





		var centerX, centerY;

		if(dData[i].length == 6){
			diamondGraphics.moveTo(dData[i][0], dData[i][1]);
			diamondGraphics.lineTo(dData[i][2], dData[i][3]);
			diamondGraphics.lineTo(dData[i][4], dData[i][5]);
			diamondGraphics.lineTo(dData[i][0], dData[i][1]);

			/* remove after19
			if(device == 'pc'){
				graphicMask.moveTo(dData[i][0], dData[i][1]);
				graphicMask.lineTo(dData[i][2], dData[i][3]);
				graphicMask.lineTo(dData[i][4], dData[i][5]);
				graphicMask.lineTo(dData[i][0], dData[i][1]);
			}else{
				moveGraphics.moveTo(dData[i][0], dData[i][1]);
				moveGraphics.lineTo(dData[i][2], dData[i][3]);
				moveGraphics.lineTo(dData[i][4], dData[i][5]);
				moveGraphics.lineTo(dData[i][0], dData[i][1]);
			}
			*/
			moveGraphics.moveTo(dData[i][0], dData[i][1]);
			moveGraphics.lineTo(dData[i][2], dData[i][3]);
			moveGraphics.lineTo(dData[i][4], dData[i][5]);
			moveGraphics.lineTo(dData[i][0], dData[i][1]);


			centerX = (dData[i][0] + dData[i][2] + dData[i][4]) / 3;
			centerY = (dData[i][1] + dData[i][3] + dData[i][5]) / 3;
		}else if(dData[i].length == 8){
			diamondGraphics.moveTo(dData[i][0], dData[i][1]);
			diamondGraphics.lineTo(dData[i][2], dData[i][3]);
			diamondGraphics.lineTo(dData[i][4], dData[i][5]);
			diamondGraphics.lineTo(dData[i][6], dData[i][7]);
			diamondGraphics.lineTo(dData[i][0], dData[i][1]);

			/* remove after19
			if(device == 'pc'){
				graphicMask.moveTo(dData[i][0], dData[i][1]);
				graphicMask.lineTo(dData[i][2], dData[i][3]);
				graphicMask.lineTo(dData[i][4], dData[i][5]);
				graphicMask.lineTo(dData[i][6], dData[i][7]);
				graphicMask.lineTo(dData[i][0], dData[i][1]);
			}else{
				moveGraphics.moveTo(dData[i][0], dData[i][1]);
				moveGraphics.lineTo(dData[i][2], dData[i][3]);
				moveGraphics.lineTo(dData[i][4], dData[i][5]);
				moveGraphics.lineTo(dData[i][6], dData[i][7]);
				moveGraphics.lineTo(dData[i][0], dData[i][1]);
			}
			*/
			moveGraphics.moveTo(dData[i][0], dData[i][1]);
			moveGraphics.lineTo(dData[i][2], dData[i][3]);
			moveGraphics.lineTo(dData[i][4], dData[i][5]);
			moveGraphics.lineTo(dData[i][6], dData[i][7]);
			moveGraphics.lineTo(dData[i][0], dData[i][1]);

			centerX = (dData[i][0] + dData[i][2] + dData[i][4] + dData[i][6]) / 4;
			centerY = (dData[i][1] + dData[i][3] + dData[i][5] + dData[i][7]) / 4;
		}

		diamondGraphics.e_data.ct_x = centerX;
		diamondGraphics.e_data.ct_y = centerY;
		diamondGraphics.endFill();

		var rt = Math.atan2(centerY, centerX);
		var dis = Math.sqrt(centerX * centerX + centerY * centerY);
		dis -= 8;
		var newCenterX = Math.cos(rt) * dis;
		var newCenterY = Math.sin(rt) * dis;

		/* remove after19
		if(device == 'pc'){
			graphicMask.endFill();

			//
			var rt = Math.atan2(centerY, centerX);
			//
			var dis = Math.sqrt(centerX * centerX + centerY * centerY);
			dis -= 8;
			var newCenterX = Math.cos(rt) * dis;
			var newCenterY = Math.sin(rt) * dis;
			moveGraphicsContainer.x = newCenterX;
			moveGraphicsContainer.y = newCenterY;

			moveGraphics.drawRect(-100 , -100, 200, 200);
			moveGraphics.rotation = rt;
			moveGraphics.endFill();
			// moveGraphics.blendMode = PIXI.BLEND_MODES.ADD;

		}else{
			moveGraphics.endFill();
		}*/
		moveGraphics.endFill();




		var moveSpDataObj = {
								target: moveGraphicsContainer,
								rot: rt,
								origX: centerX,
								origY: centerY,
								x: newCenterX,
								y: newCenterY,
								prog: Math.random()*2-1, // -1~1
								// sp: 0.01, 
								sp: Math.random() *0.005 + 0.005, 
								range: 400
							};

		moveSpData.push(moveSpDataObj);

		/* remove after19
		if(device == 'pc'){
			moveGraphicsContainer.mask = graphicMask;
		}else{

		}
		*/



	};

	contentBd = new PIXI.Graphics();
	app.stage.addChild(contentBd);
	contentBd.interactive = true;
	contentBd.alpha = 1;
	contentBd.e_data = {
							pos1:0,
							pos2:0,
							tmpPos1:0,
							tmpPos2:0,
						}





}

function intro(){
	// centerContainer.scale.x = 30;
	// centerContainer.scale.y = 30;

	// v1 //
	/*
	centerContainer.alpha = 0;
	centerContainer.rotation = 30 * (Math.PI / 180);
	TweenMax.to(centerContainer, 2.5, {alpha:1, rotation: 0, ease:Strong.easeOut});
	*/

	// v2 //
	centerContainer.alpha = 0;
	TweenMax.to(centerContainer, 2.5, {alpha:1, ease:Strong.easeOut});

	TweenMax.to(centerContainer.scale, 2.5,
										{
											x:device=='pc' ? PC_DATA.stageScale:MOB_DATA.stageScale,
											y:device=='pc' ? PC_DATA.stageScale:MOB_DATA.stageScale,
											ease:Strong.easeInOut
										});

	inValue = 0;
	TweenMax.to(this, 1.5,{inValue:1, onUpdate:function(){
			// console.log(inValue);
		}, ease:Strong.easeOut
	});
}


$(function() {
	initView();
	initController();
	//
	intro();
});


function initController(){
	$('.cl').click(function(){
		closeDiamond();
	});

	$('.aw-l').click(function(){
		clickID --;
		if(clickID < 0){ clickID = dData.length -1;	};
		openDiamond(diamondData[clickID].e_data.ct_x, diamondData[clickID].e_data.ct_y);
	});
	$('.aw-r').click(function(){
		clickID ++;
		if(clickID >= dData.length){ clickID = 0;	};
		openDiamond(diamondData[clickID].e_data.ct_x, diamondData[clickID].e_data.ct_y);
	});
}


app.ticker.add(function(delta) {
    // moveGraphicsContainer.rotation += 0.1 * delta;

    var counts = moveSpData.length;
    for(var i = 0; i< counts; i++){
    	var target = moveSpData[i].target;

    	/* remove after19
    	if(device == 'pc'){
	    	moveSpData[i].prog += moveSpData[i].sp;
    		if(moveSpData[i].prog >= 1){ moveSpData[i].prog = -1 };
	    	var dis = Math.sqrt(moveSpData[i].origX * moveSpData[i].origX + moveSpData[i].origY * moveSpData[i].origY);
	    	dis += moveSpData[i].prog * moveSpData[i].range;

	    	target.x = Math.cos(moveSpData[i].rot) * dis;
	    	target.y = Math.sin(moveSpData[i].rot) * dis;
	    }else{
	    	moveSpData[i].prog += moveSpData[i].sp;
	    	if(moveSpData[i].prog >= 1){ moveSpData[i].prog = -1 };
	    	target.alpha = Math.cos(Math.PI * (moveSpData[i].prog +1 ));
	    }
	    */

    	moveSpData[i].prog += moveSpData[i].sp;
    	if(moveSpData[i].prog >= 1){ moveSpData[i].prog = -1 };
    	target.alpha = Math.cos(Math.PI * (moveSpData[i].prog +1 ));

    }

    
    counts = diamondData.length;
    for(var i = 0; i< counts; i++){
		var target = diamondData[i];
		target.e_data.inAlpha += (1 - target.e_data.inAlpha) * 1 / target.e_data.inAlphaSp;
		target.alpha = target.e_data.inAlpha > 0? target.e_data.inAlpha : 0;
    }
	
	document.getElementById('ot').innerHTML = Math.floor(app.ticker.FPS);
});

function clickDiamond(e){

	// console.log(e);
	// console.log(e.data);
	// console.log(e.currentTarget.e_data);
	// console.log(e.currentTarget.e_data.ct_x + ' , ' + e.currentTarget.e_data.ct_y);

	clickID = Number(e.currentTarget.e_data.id);

	openDiamond(e.currentTarget.e_data.ct_x, e.currentTarget.e_data.ct_y);


	console.log('clickID: '+clickID);

}

function openDiamond($ct_x, $ct_y){

	contentBd.interactive = true;

	TweenMax.to(contentBd, 1, {delay:.15, alpha:1, x:0, y:0, ease:Strong.easeOut});

	var openScale = 16; //6
	var moveToX, moveToY;
	var moveScaleX, moveScaleY;

	if(device == 'pc'){
		moveToX = app.renderer.width * .25 + $ct_x * -1 * openScale * PC_DATA.stageScale;
		moveToY = app.renderer.height * .5 + $ct_y * -1 * openScale * PC_DATA.stageScale;
		moveScaleX = openScale * PC_DATA.stageScale;
		moveScaleY = openScale * PC_DATA.stageScale;
	}else{
		moveToX = app.renderer.width * .5 + $ct_x * -1 * openScale * MOB_DATA.stageScale;
		moveToY = app.renderer.height * .15 + $ct_y * -1 * openScale * MOB_DATA.stageScale; // 0.5 > 0.25; 0.3 > 0.15
		moveScaleX = openScale * MOB_DATA.stageScale;
		moveScaleY = openScale * MOB_DATA.stageScale;
	}




	TweenMax.to(centerContainer, 0.9, {x: moveToX, y: moveToY, ease:Strong.easeOut});
	TweenMax.to(centerContainer.scale, 0.9, { x: moveScaleX, y: moveScaleY, ease:Strong.easeOut});


	// content BD //
	var randPos;
	if(device == 'pc'){
		randPos = Math.random()*80;
		contentBd.e_data.tmpPos1 = randPos;

		randPos = Math.random()*80+40;
		contentBd.e_data.tmpPos2 = randPos;
	}else{
		randPos = Math.random()*40;
		contentBd.e_data.tmpPos1 = randPos;

		randPos = Math.random()*40+20;
		contentBd.e_data.tmpPos2 = randPos;
	}

	/*
	console.log('contentBd.e_data.tmpPos1: '+contentBd.e_data.tmpPos1);
	console.log('contentBd.e_data.tmpPos2: '+contentBd.e_data.tmpPos2);
	console.log('contentBd.e_data.pos1: '+contentBd.e_data.pos1);
	console.log('contentBd.e_data.pos2: '+contentBd.e_data.pos2);
	*/

	openValue = 0;

	TweenMax.to(this, 0.9, {openValue: 1, ease:Strong.easeOut, onUpdate:function(){

		// console.log( this.target.openValue);

		contentBd.clear();
		contentBd.beginFill(0xccccccc, 0.75);

		if(device == 'pc'){
			movePos1 = contentBd.e_data.pos1 + (contentBd.e_data.tmpPos1 - contentBd.e_data.pos1) * this.target.openValue;
			contentBd.moveTo(app.renderer.width*0.5+movePos1, 0);
			contentBd.lineTo(app.renderer.width, 0);
			contentBd.lineTo(app.renderer.width, app.renderer.height);
			contentBd.lineTo(app.renderer.width*0.5-movePos1, app.renderer.height);
			contentBd.lineTo(app.renderer.width*0.5+movePos1, 0);
		}else{
			movePos1 = contentBd.e_data.pos1 + (contentBd.e_data.tmpPos1 - contentBd.e_data.pos1) * this.target.openValue;
			contentBd.moveTo(app.renderer.width, app.renderer.height*0.3-movePos1); // 0.5
			contentBd.lineTo(app.renderer.width, app.renderer.height);
			contentBd.lineTo(0, app.renderer.height);
			contentBd.lineTo(0, app.renderer.height*0.3+movePos1); // 0.5
			contentBd.lineTo(app.renderer.width, app.renderer.height*0.3-movePos1); // 0.5
		}

		contentBd.endFill();
		contentBd.beginFill(0xffffff, 0.75);

		if(device == 'pc'){
			movePos2 = contentBd.e_data.pos2 + (contentBd.e_data.tmpPos2 - contentBd.e_data.pos2) * this.target.openValue;
			contentBd.moveTo(app.renderer.width*0.5+movePos2, 0);
			contentBd.lineTo(app.renderer.width, 0);
			contentBd.lineTo(app.renderer.width, app.renderer.height);
			contentBd.lineTo(app.renderer.width*0.5-movePos2, app.renderer.height);
			contentBd.lineTo(app.renderer.width*0.5+movePos2, 0);
		}else{
			movePos2 = contentBd.e_data.pos2 + (contentBd.e_data.tmpPos2 - contentBd.e_data.pos2) * this.target.openValue;
			contentBd.moveTo(app.renderer.width, app.renderer.height*0.3-movePos2); // 0.5
			contentBd.lineTo(app.renderer.width, app.renderer.height);
			contentBd.lineTo(0, app.renderer.height);
			contentBd.lineTo(0, app.renderer.height*0.3+movePos2); // 0.5
			contentBd.lineTo(app.renderer.width, app.renderer.height*0.3-movePos2); // 0.5
		}

		contentBd.endFill();


	}, onComplete:function(){
		contentBd.e_data.pos1 = contentBd.e_data.tmpPos1;
		contentBd.e_data.pos2 = contentBd.e_data.tmpPos2;
	}});

	$('.aw-l').fadeIn();
	$('.aw-r').fadeIn();
	$('.cl').fadeIn();

	$('.content').fadeOut(100, function(){

		var openData = testData[clickID % testData.length];
		// console.log(openData);

		$('.content .dc .title').text(openData.title);
		$('.content .dc .desc').text(openData.desc);

		$('.content').fadeIn();
	})
}
function closeDiamond(){

	contentBd.interactive = false;
	
	if(device == 'pc'){
		TweenMax.to(contentBd, 1, {alpha:0, x: app.renderer.width * 0.2, ease:Strong.easeOut});
	}else{
		TweenMax.to(contentBd, 1, {alpha:0, y: app.renderer.height * 0.3, ease:Strong.easeOut});
	}

  	TweenMax.to(centerContainer, 0.5, {x: app.renderer.width * .5, y: app.renderer.height * .5, ease:Strong.easeOut});
	if(device == 'pc'){
		// TweenMax.to(centerContainer.scale, 0.5, {x: 1, y: 1, ease:Strong.easeOut});
		TweenMax.to(centerContainer.scale, 0.5, {x: PC_DATA.stageScale, y: PC_DATA.stageScale, ease:Strong.easeOut});
	}else{
		TweenMax.to(centerContainer.scale, 0.5, {x: MOB_DATA.stageScale, y:MOB_DATA.stageScale, ease:Strong.easeOut});
	}

	$('.aw-l').fadeOut();
	$('.aw-r').fadeOut();
	$('.cl').fadeOut();

	$('.content').fadeOut();
}

window.onresize = function (event){
  var w = window.innerWidth;
  var h = window.innerHeight;

  app.view.style.width = w + "px";
  app.view.style.height = h + "px";
  app.renderer.resize(w,h);

  centerContainer.x = app.renderer.width * .5;
  centerContainer.y = app.renderer.height * .5;

};

onresize();

//////////



function hsvToRGB2(hue, saturation, value) {
    var hi;
    var f;
    var p;
    var q;
    var t;

    while (hue < 0) {
    hue += 360;
    }
    hue = hue % 360;

    saturation = saturation < 0 ? 0
    : saturation > 1 ? 1
    : saturation;

    value = value < 0 ? 0
    : value > 1 ? 1
    : value;

    value *= 255;
    hi = (hue / 60 | 0) % 6;
    f = hue / 60 - hi;
    p = value * (1 -           saturation) | 0;
    q = value * (1 -      f  * saturation) | 0;
    t = value * (1 - (1 - f) * saturation) | 0;
    value |= 0;

    switch (hi) {
    case 0:
      return [value, t, p];
    case 1:
      return [q, value, p];
    case 2:
      return [p, value, t];
    case 3:
      return [p, q, value];
    case 4:
      return [t, p, value];
    case 5:
      return [value, p, q];
    }
}