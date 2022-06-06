import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from pyodide.http import pyfetch
import asyncio

api_url = 'https://api.coingecko.com/api/v3/coins/{}/market_chart?vs_currency=usd&days={}&interval=daily'
headers={'Content-type':'text/plain'}
async def get_crypto_data(coin, days):
  json_url = api_url.format(coin, days)
  resp = await pyfetch(json_url, method="GET", headers=headers)
  bjson = await resp.json()
  prices = bjson["prices"]
  df_price = pd.DataFrame(prices)  
  df_price = df_price.rename({0: 'date', 1: 'price'}, axis=1)  # new method
  df_price = df_price.set_index('date')
  return df_price

crypto = ['ethereum','bitcoin']

crypto_data = {}
for coin in crypto:
  crypto_price_df = await get_crypto_data(coin, 200)
  crypto_data[coin] = crypto_price_df
    
dfp = pd.concat([crypto_data['bitcoin']['price'],crypto_data['ethereum']['price']], axis=1)
dfp.columns = ['bitcoin','ethereum']


mean_daily_ret = dfp.pct_change(1).mean()
print("Daily Return: ", mean_daily_ret)

corr = dfp.pct_change(1).corr()
print("Correlation Matrix: ", corr)
crypto_normed = dfp/dfp.iloc[0]
fig = crypto_normed.plot(figsize=(100,100)) # not working atm

crypto_daily_ret = dfp.pct_change(1)  # Daily return
log_ret = np.log(dfp/dfp.shift(1))  #Log return
log_ret.hist(bins=100,figsize=(12,6));
fig = plt.tight_layout() # not working!!
fig
print("Basic Statistics:")
log_ret.describe().transpose()

print("Covariance:")
log_ret.cov()

# optimization

num_ports = 10000

all_weights = np.zeros((num_ports,len(dfp.columns)))
ret_arr = np.zeros(num_ports)
vol_arr = np.zeros(num_ports)
sharpe_arr = np.zeros(num_ports)

for ind in range(num_ports):
  # Create Random Weights
  weights = np.array(np.random.random(4))
  # Rebalance Weights
  weights = weights / np.sum(weights)
  # Save Weights
  all_weights[ind,:] = weights
  # Expected Return
  ret_arr[ind] = np.sum((log_ret.mean() * weights) *252)
  # Expected Variance
  vol_arr[ind] = np.sqrt(np.dot(weights.T, np.dot(log_ret.cov() * 252, weights)))
  # Sharpe Ratio
  sharpe_arr[ind] = ret_arr[ind]/vol_arr[ind]
  
max_sr_ret = ret_arr[sharpe_arr.argmax()]
max_sr_vol = vol_arr[sharpe_arr.argmax()]
print('Return with Maximum SR')
print(max_sr_ret)
print('Volality with Maximum SR')
print(max_sr_vol)