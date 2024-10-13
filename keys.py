from datetime import datetime

def get_date():
    # Get the current date
    now = datetime.now()
    
    # Format the date as MMDDYYYY
    formatted_date = now.strftime("%m%d%Y")
    
    return formatted_date

def pseudo_random(seed):
    # Linear congruential generator (LCG) parameters
    a = 1664525
    c = 1013904223
    m = 2 ** 32  # 2^32

    # Update seed
    seed = (a * seed + c) % m

    # Return a pseudo-random integer within the range [0, m)
    return seed


if __name__ == "__main__":
    print(pseudo_random(int(get_date())))