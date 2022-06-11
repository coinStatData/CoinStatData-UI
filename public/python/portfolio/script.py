

# def barchart(log_ret):
#   fig, ax = plt.subplots(figsize=(10, 5))
#   plt.hist(log_ret, bins=100)
#   plt.tight_layout()
#   plt.title('Return Frequency')
#   plt.xlabel('Return %')
#   plt.ylabel('Frequency')
#   plt.legend(log_ret.columns)
#   pyscript.write('bar-chart', fig)
#   print("Basic Statistics:")
#   log_ret.describe().transpose()
#   print("Covariance:")
#   print(log_ret.cov())
#   global log_return
#   log_return = log_ret
