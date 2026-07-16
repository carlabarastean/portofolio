
\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{spidercv}[03/01/2022]

\DeclareOption*{\PassOptionsToClass{\CurrentOption}{extarticle}} % Pass through any options to the base class
\ProcessOptions\relax % Process given options

\LoadClass{extarticle} % Load the base class

%----------------------------------------------------------------------------------------
%	PACKAGES AND OTHER DOCUMENT CONFIGURATIONS
%----------------------------------------------------------------------------------------

\setlength{\parindent}{0mm} % Suppress paragraph indentation
\usepackage[hidelinks]{hyperref} % Required for links but hide the default boxes around links
\newcommand{\lorem}{Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus.} % Dummy text
\pagestyle{empty} % No headers or footers
\usepackage{moresize} % Provides more font size commands (\HUGE and \ssmall)
\usepackage{ifthen}

%----------------------------------------------------------------------------------------
%----------------------------------------------------------------------------------------
%	COLORS
%------------------------------------------------------------------------------
\usepackage[dvipsnames]{xcolor}

% Portfolio-aligned palette: deep ink, restrained magenta and warm neutrals
\definecolor{CVInk}{HTML}{211A2B}
\definecolor{CVBackground}{HTML}{F4F0ED}
\definecolor{CVAccent}{HTML}{B31768}
\definecolor{CVAccentDark}{HTML}{7E1048}
\definecolor{CVSoftBox}{HTML}{F2DCE7}
\definecolor{CVWhite}{HTML}{FFFFFF}

% Compatibility aliases
\definecolor{Black}{HTML}{1F2328}
\definecolor{White}{HTML}{FFFFFF}

%%%%% color macros
\newcommand{\DefineColorMacros}[5]{% TextSide / TextMain / Highlight / Background / Other
    \def\ColorTextSide{#1}
    \def\ColorTextMain{#2}
    \def\ColorHighlight{#3}
    \def\ColorBackground{#4}
    \def\ColorTextBox{#5}
    \def\ColorOther{#5}
    \color{\ColorTextMain}
}

\DefineColorMacros{CVInk}{CVInk}{CVAccent}{CVBackground}{CVSoftBox}
%----------------------------------------------------------------------------------------
%	FONTS
%----------------------------------------------------------------------------------------

\usepackage[utf8]{inputenc} % Required for inputting international characters
\usepackage[T1]{fontenc} % Output font encoding for international characters

% \usepackage{roboto}
\usepackage[scaled]{helvet}


\renewcommand*\familydefault{\sfdefault} % Force the sans-serif version of any font used



%----------------------------------------------------------------------------------------
%	GEOMETRIE
%----------------------------------------------------------------------------------------
\usepackage{calc}
\usepackage{tikz}
\usepackage{graphicx}
\usetikzlibrary{calc,positioning,backgrounds,matrix}

\newlength\margin
\setlength\margin{0.5cm}
\usepackage[margin=\margin,noheadfoot,a4paper]{geometry}
\newlength\sidewidth
\setlength\sidewidth{0.33333\paperwidth-2\margin}
%% AICI: după \newlength\sidewidth
% Factor de subtiere pentru bara laterala in pagina a doua (0.0-1.0)
% -----------------------------------------------------------------------------
%  Factor de subțiere pentru bara laterală (folosit deja de SideBar2Slim)
\newcommand{\SideBarSlimFactor}{1}

%  Zona principală pentru pagina a doua (întinde tot spațiul liber)
\newlength\slimmainwidth
\setlength\slimmainwidth{\paperwidth-4\margin-\SideBarSlimFactor\sidewidth}
% -----------------------------------------------------------------------------


\newlength\mainwidth
\setlength\mainwidth{\paperwidth-4\margin-\sidewidth}
\newlength\anglesize
\setlength\anglesize{0.7cm}
\newlength\topheight
\setlength\topheight{\sidewidth-0.35cm}
\newlength\profilesize
\setlength\profilesize{0.7\sidewidth}
\newlength\profilelineend
\setlength\profilelineend{\sidewidth+1.3\margin}




%----------------------------------------------------------------------------------------
%	MAIN SECTIONS
%----------------------------------------------------------------------------------------

\usepackage{ragged2e}
\usepackage[absolute,overlay]{textpos} % option needed to use absolute positionning and to have text on front

\newenvironment{SideBar}[2]{% Background color, Text color
    \begin{tikzpicture}[remember picture,overlay]% put text anywhere    
        \fill[fill=#1, shift={(current page.north west)}] % side and top background
            (0,-\paperheight) --
            (0,-\anglesize) --
            (\anglesize,0) --
            (\paperwidth,0) --
            (\paperwidth,-\topheight-2\margin) --
            (\sidewidth+2\margin+\anglesize,-\topheight-2\margin) --
            (\sidewidth+2\margin,-\topheight-2\margin-\anglesize) --
            (\sidewidth+2\margin,-\paperheight) --
            cycle;
        \draw [draw=#1, shift={(current page.north west)}, very thick]
            (\paperwidth-0.5\margin,-\topheight-3\margin) --
            (\paperwidth-0.5\margin,-\paperheight+0.5\margin+0.5\anglesize) --
            (\paperwidth-0.5\margin-0.5\anglesize,-\paperheight+0.5\margin) --
            (\sidewidth+3\margin,-\paperheight+0.5\margin);
    \end{tikzpicture}%
    %%%%%%%%%%%%%
    % \TPmargin{}{}
    \begin{textblock*}{\sidewidth}(\margin,\topheight + 3\margin -0.4cm)
    \begin{center}
    \color{#2}
    % Please use vspace to verticaly align manually your content
}{
    \end{center}
    \end{textblock*}
}


\newenvironment{TopBar}[1]{ % Text color
    \begin{textblock*}{\mainwidth}(\sidewidth+3\margin,\margin-0.4cm)
    \begin{center}
    \color{#1}
}{
    \end{center}
    \end{textblock*}
}

% =======================================================================================
% === SideBar2Slim: bara laterală “slim” fără chenarul de sus ==========================
% =======================================================================================
%% AICI: noul environment SideBar2Slim
\newenvironment{SideBar2Slim}[2]{% Background color, Text color
   \begin{tikzpicture}[remember picture,overlay]
        % umplere bara laterală subțiată
        \fill[fill=#1, shift={(current page.north west)}]
            (0,-\paperheight) --
            (0,0) --
            (\SideBarSlimFactor\sidewidth+2\margin,0) --
            (\SideBarSlimFactor\sidewidth+2\margin,-\paperheight) --
            cycle;
        % contur jos și dreapta
        \draw [draw=#1, shift={(current page.north west)}, very thick]
            (\SideBarSlimFactor\sidewidth+3\margin,-\paperheight+0.5\margin) --
            (\paperwidth-0.5\margin-0.5\anglesize,-\paperheight+0.5\margin) --
            (\paperwidth-0.5\margin,-\paperheight+0.5\margin+0.5\anglesize);
   \end{tikzpicture}%
   % textblock slim
   \begin{textblock*}{\SideBarSlimFactor\sidewidth}(\margin,\topheight + 3\margin -0.4cm)
   \begin{center}\color{#2}
}{
   \end{center}
   \end{textblock*}
}
%% sfârșit SideBar2Slim

% =======================================================================================
% =======================================================================================




\newenvironment{TopBar2}[1]{ % Text color
     \begin{textblock*}{5\mainwidth}(\sidewidth+2.8\margin, \margin)
    \color{#1}
}{
    \end{textblock*}
}



\newenvironment{MainPart}{
    \begin{textblock*}{\mainwidth}(\sidewidth+3\margin,\topheight + 3\margin-0.4cm)
    \begin{center}
}{
    \end{center}
    \end{textblock*}
}

% -----------------------------------------------------------------------------
%  MainPart2Slim: poziţionează textul centrat faţă de SideBar2Slim
\newenvironment{MainPart2Slim}{
    \begin{textblock*}{\slimmainwidth}%
        (\SideBarSlimFactor\sidewidth+3\margin,\margin)

    \begin{center}
}{
    \end{center}
    \end{textblock*}
}
% -----------------------------------------------------------------------------


\usetikzlibrary{shapes,decorations}
\newcommand{\DefineProfile}[3]% Background color, Highlight color, Img path
{   
    \begin{tikzpicture}[remember picture,overlay]
        \node [rectangle, draw=#2, rounded corners=0.5mm, very thick,
        shift={(current page.north west)}, xshift=\anglesize, yshift=-\anglesize](s1){};

        \node [rectangle, draw=#2, rounded corners=0.5mm, very thick,
        shift={(current page.north west)}, xshift=\profilelineend, yshift=-\profilelineend](s2){};

        \draw [draw=#2, very thick] (s1) -- (s2);

        \node[
            shift={(current page.north west)},
            xshift=(\sidewidth+2\margin)/2,
            yshift=-(\sidewidth+2\margin)/2,
            chamfered rectangle,
            draw=#2,
            very thick,
            minimum size=\profilesize,
            inner sep=0pt,
            outer sep=0pt,
            fill=#1,
            path picture={
                \node[
                    inner sep=0pt
                ] at (path picture bounding box.center) {
                    \includegraphics[
                        width=\profilesize
                    ]{#3}
                };
            }
        ]{};
    \end{tikzpicture}
}






%----------------------------------------------------------------------------------------
%	COMMANDS AND ENVIRONMENTS
%----------------------------------------------------------------------------------------

%%%%%%% Top bar

%%% Name
\newcommand{\Name}[4]% Highlight color, Name, Profession, Age
{
    {\HUGE{\textbf{\color{#1}#2}}\\[0.16cm]
    \large{#3}}
    \vspace*{0.45cm}
}




%%%%%%%%%%%%%% Main part

%%%%%% Section title
\newcommand{\MainTitleBis}[4]{% Background color, Highlight color, Left text, Right text
    \begin{tikzpicture}[baseline]    
        \node[
            draw=#2,
            rounded corners=1.2mm,
            fill=#1,
            inner sep=3pt,
            very thick,
            anchor=west
        ] at (0,0) (box1)
        {\textbf{\large\color{\ColorTextMain}#3}};

        \draw [very thick, draw=#2, inner sep=0pt] (box1.east) -- ({\textwidth-1pt},0);
    \end{tikzpicture}\\
}

\def\hrulefill{\leavevmode\leaders\hrule height 0.35mm\hfill\kern\z@} % ~ very thick

\newcommand{\Experience}[5]{% Highlight color, Title, Left subtitle, Right subtitle, Description
    \begin{flushleft}
        \normalsize{\textbf{#2\hfill{\footnotesize\color{#1}#4}}}\\\vspace{-.5ex}
        \footnotesize{
            {\color{#1}\hrulefill}
            \hspace{1ex}
            \raisebox{-.4ex}{\color{\ColorTextMain}\textbf{#3}}
        }\\
        \small{#5}
    \end{flushleft}
    \vspace*{0.04cm}
}




%%%%%% Common tools

%%% Text separators

\newcommand{\TextSeparator}[2]% Highlight color, Text
{
    \noindent\makebox[\linewidth]{{\color{#1}\hrulefill}
    \hspace{1ex}\raisebox{-.4ex}{\textbf{\large{#2}}}
    \hspace{1ex}{\color{#1}\hrulefill}}
}

\newcommand{\TextSeparatorBis}[3]% Highlight color, Left text, Right text
{
    \noindent\makebox[\linewidth]{{\color{#1}\hrulefill}
    \hspace{1ex}\raisebox{-.4ex}{\textbf{\large{#3}}}}
}

\newcommand{\SimpleSeparator}[1]% Highlight color
{
    \noindent\makebox[\linewidth]{
    {\color{#1}\hrulefill}}
}

%%% ItemList
\usepackage{enumerate}
\newenvironment{ItemList}[1] % Bullet color
  { \renewcommand{\descriptionlabel}[1]{
    \def\temp{##1}\ifx\temp\empty
        \hspace\labelsep{\textbf{\color{#1}\tiny\faSquare}}% Default bullet
    \else
        \hspace\labelsep{\textbf{\color{#1}##1}}
    \fi
    }%
    \begin{description}}
  {\end{description}}


%%% DoubleColumns
\newenvironment{DoubleColumns}{
    %%%%%%%%% Use this command to split
    \newcommand{\nextcolumn}{\end{center}\end{minipage}\hfill\begin{minipage}[t]{0.5\textwidth-0.5\margin}\begin{center}}

    \begin{minipage}[t]{0.5\textwidth-0.5\margin}
    \begin{center}
}{
    \end{center}
    \end{minipage}\\\vspace*{0.15cm}
}

%%% TripleColumns
\newenvironment{TripleColumns}{
    %%%%%%%%% Use this command to split
    \newcommand{\nextcolumn}{\end{center}\end{minipage}\hfill\begin{minipage}[t]{0.3333\textwidth-0.5\margin}\begin{center}}
    
    \begin{minipage}[t]{0.3333\textwidth-0.5\margin}
    \begin{center}
}{
    \end{center}
    \end{minipage}\\\vspace*{0.15cm}
}

%%% Label
\newcommand{\Label}[2]{% Highlight color, Text
    \tikz[baseline]\node[
        anchor=base,
        draw=#1,
        fill=CVWhite,
        rounded corners,
        inner xsep=1ex,
        inner ysep=0.75ex,
        text height=1.5ex,
        text depth=.25ex,
        thick,
        text=\ColorTextMain
    ]{#2};
}

\newcommand{\SidebarAccentItem}[2]{% Highlight color, Text
    \noindent\makebox[4.6cm][l]{%
        \textcolor{#1}{\rule[0.45ex]{0.42cm}{0.9pt}}%
        \hspace{0.65em}\textcolor{\ColorTextMain}{#2}%
    }
}

\newenvironment{SkillGauges}{%
    \begin{tabular}{l l}
}{
    \end{tabular}
}

\newcommand{\addGauge}[2]{
    #1 & (#2) \\
}
