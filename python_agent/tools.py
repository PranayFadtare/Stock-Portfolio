# python_agent/tools.py

import yfinance as yf
from langchain_core.tools import tool
from datetime import date

# Note: All functions from your notebook are defined here using the @tool decorator.

@tool
def get_stock_price(symbol: str) -> str:
    """Use this tool to get the current stock price of a company. The input should be the stock symbol."""
    ticker = yf.Ticker(symbol)
    todays_data = ticker.history(period='1d')
    if todays_data.empty:
        return f"Could not find stock price for {symbol}."
    return f"The current stock price of {symbol} is ${todays_data['Close'].iloc[-1]:.2f}"

@tool
def company_information(ticker: str) -> dict:
    """Use this tool to retrieve company information like address, industry, sector, business summary, marketCap, etc."""
    ticker_obj = yf.Ticker(ticker)
    return ticker_obj.get_info()

@tool
def last_dividend_and_earnings_date(ticker: str) -> dict:
    """Use this tool to retrieve a company's last dividend date and earnings release dates."""
    ticker_obj = yf.Ticker(ticker)
    return ticker_obj.get_calendar()

@tool
def summary_of_mutual_fund_holders(ticker: str) -> dict:
    """Use this tool to retrieve a company's top mutual fund holders."""
    ticker_obj = yf.Ticker(ticker)
    mf_holders = ticker_obj.get_mutualfund_holders()
    return mf_holders.to_dict(orient="records") if not mf_holders.empty else {}

@tool
def summary_of_institutional_holders(ticker: str) -> dict:
    """Use this tool to retrieve a company's top institutional holders."""
    ticker_obj = yf.Ticker(ticker)
    inst_holders = ticker_obj.get_institutional_holders()
    return inst_holders.to_dict(orient="records") if not inst_holders.empty else {}

@tool
def stock_grade_updrages_downgrades(ticker: str) -> dict:
    """Use this to retrieve grade ratings upgrades and downgrades details of a particular stock."""
    ticker_obj = yf.Ticker(ticker)
    upgrades_downgrades = ticker_obj.get_upgrades_downgrades()
    if not upgrades_downgrades.empty:
        curr_year = date.today().year
        upgrades_downgrades = upgrades_downgrades.loc[upgrades_downgrades.index > f"{curr_year}-01-01"]
        upgrades_downgrades = upgrades_downgrades[upgrades_downgrades["Action"].isin(["up", "down"])]
        return upgrades_downgrades.to_dict(orient="records")
    return {}

@tool
def stock_splits_history(ticker: str) -> dict:
    """Use this tool to retrieve a company's historical stock splits data."""
    ticker_obj = yf.Ticker(ticker)
    hist_splits = ticker_obj.get_splits()
    return hist_splits.to_dict() if not hist_splits.empty else {}

@tool
def stock_news(ticker: str) -> dict:
    """Use this to retrieve latest news articles discussing a particular stock ticker."""
    ticker_obj = yf.Ticker(ticker)
    return ticker_obj.get_news()

# A list containing all the tool functions
all_tools = [
    get_stock_price,
    company_information,
    last_dividend_and_earnings_date,
    summary_of_mutual_fund_holders,
    summary_of_institutional_holders,
    stock_grade_updrages_downgrades,
    stock_splits_history,
    stock_news,
]