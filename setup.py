from pathlib import Path
import setuptools

this_directory = Path(__file__).parent
long_description = (this_directory / "README.md").read_text()

setuptools.setup(
    name="streamlit-grid",
    version="0.1.2",
    author="Syeda Hoorain Ali",
    author_email="jagjets133@gmail.com",
    description="Streamlit component that allows you to create interactive grid layouts in your Streamlit apps.",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/syedahoorainali/streamlit-grid-component",
    packages=setuptools.find_packages(),
    include_package_data=True,
    classifiers=[
        "Development Status :: 4 - Beta",
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires=">=3.7",
    install_requires=[
        "streamlit >= 0.63",
    ],
    extras_require={
        "devel": [
            "wheel",
            "pytest==7.4.0",
            "playwright==1.48.0",
            "requests==2.31.0",
            "pytest-playwright-snapshot==1.0",
            "pytest-rerunfailures==12.0",
        ]
    },
    license="MIT",
)
